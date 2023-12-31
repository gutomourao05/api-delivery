/*
  Warnings:

  - You are about to drop the `itens-menus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `itens-menus`;

-- CreateTable
CREATE TABLE `itens-menu` (
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

-- CreateTable
CREATE TABLE `itens-order` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `idItenMenu` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `idItenOrder` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,
    `idAddress` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `orders_idUser_key`(`idUser`),
    UNIQUE INDEX `orders_idAddress_key`(`idAddress`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `itens-order` ADD CONSTRAINT `itens-order_idItenMenu_fkey` FOREIGN KEY (`idItenMenu`) REFERENCES `itens-menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_idItenOrder_fkey` FOREIGN KEY (`idItenOrder`) REFERENCES `itens-order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_idAddress_fkey` FOREIGN KEY (`idAddress`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
