from torch.utils.data import Dataset, DataLoader, random_split
from torchvision import transforms
from PIL import Image
import os
from OralDiseaseClassifier import logger


class OralDiseaseDataset(Dataset):
    def __init__(self, root_dir, transform=None):
        logger.info("Initializing OralDiseaseDataset")
        self.root_dir = root_dir
        self.transform = transform
        self.classes = os.listdir(root_dir)
        logger.info(f"Found classes: {self.classes}")
        self.data = []
        for cls in self.classes:
            path = os.path.join(root_dir, cls)
            for img_name in os.listdir(path):
                self.data.append(
                    (os.path.join(path, img_name), self.classes.index(cls)))
        logger.info(f"Dataset initialized with {len(self.data)} images")

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        img_path, label = self.data[idx]
        image = Image.open(img_path).convert('RGB')
        if self.transform:
            image = self.transform(image)
        # logger.info(f"Image at index {idx} has been transformed")
        return image, label


class CustomDataLoader:
    def __init__(self, root_dir, batch_size, shuffle=True, train_split=0.9) -> None:
        logger.info("Initializing DataLoader")
        self.root_dir = root_dir
        self.batch_size = batch_size
        self.shuffle = shuffle
        self.split = train_split
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])
        logger.info("DataLoader initialized")

    def prepareDataset(self):
        logger.info("Preparing dataset")
        self.dataset = OralDiseaseDataset(
            self.root_dir, transform=self.transform)
        train_size = int(self.split * len(self.dataset))
        test_size = len(self.dataset) - train_size
        self.train_dataset, self.val_dataset = random_split(
            self.dataset, [train_size, test_size])
        logger.info(
            f"Dataset split into {train_size} training and {test_size} validation images")

        return self.dataset
    
    def get_train_loader(self):
        logger.info("Getting train loader")
        return DataLoader(self.train_dataset, batch_size=self.batch_size, shuffle=True)

    def get_val_loader(self):
        logger.info("Getting validation loader")
        return DataLoader(self.val_dataset, batch_size=self.batch_size)
