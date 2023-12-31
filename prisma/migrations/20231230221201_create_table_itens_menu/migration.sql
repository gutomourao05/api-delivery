-- CreateTable
CREATE TABLE `itens-menus` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `category` ENUM('PIZZA', 'SWEET_PIZZA', 'BURGUER', 'DESSERT', 'DRINK') NOT NULL,
    `price` DOUBLE NOT NULL,
    `isActive` ENUM('TRUE', 'FALSE') NOT NULL DEFAULT 'TRUE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
