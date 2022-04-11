-- CreateTable
CREATE TABLE `RelatedPosts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postId` VARCHAR(191) NOT NULL,
    `relatedPostId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RelatedPosts_postId_relatedPostId_key`(`postId`, `relatedPostId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
