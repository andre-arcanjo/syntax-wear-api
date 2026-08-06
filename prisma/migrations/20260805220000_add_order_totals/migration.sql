ALTER TABLE "Order"
ADD COLUMN "subtotal" DECIMAL(65,30),
ADD COLUMN "shippingCost" DECIMAL(65,30);

UPDATE "Order"
SET "subtotal" = "total",
    "shippingCost" = 0;

ALTER TABLE "Order"
ALTER COLUMN "subtotal" SET NOT NULL,
ALTER COLUMN "shippingCost" SET NOT NULL;
