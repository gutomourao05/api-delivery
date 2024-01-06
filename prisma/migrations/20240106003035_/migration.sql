/*
  Warnings:

  - You are about to drop the column `idItemOrder` on the `itens-menu` table. All the data in the column will be lost.
  - You are about to drop the `itens-order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itensOrder` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `itens-menu` DROP FOREIGN KEY `itens-menu_idItemOrder_fkey`;

-- DropForeignKey
ALTER TABLE `itens-order` DROP FOREIGN KEY `itens-order_idOrder_fkey`;

-- AlterTable
ALTER TABLE `itens-menu` DROP COLUMN `idItemOrder`;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `itensOrder` JSON NOT NULL;

-- DropTable
DROP TABLE `itens-order`;
