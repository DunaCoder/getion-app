import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { createHash } from "crypto";

// Configuración obligatoria del pool y adaptador para Prisma 7
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

const productosData = [
  {
    name: "PlayStation 5",
    description: "Consola de última generación. SSD 825GB, 4K, Ray Tracing.",
    price: 499.99,
    stock: 50,
    isVisible: true,
    images: ["https://full-store-api-39oh.vercel.app/imagenes/ps5.webp"],
    categoryName: "Consolas y Videojuegos",
  },
  {
    name: "Samsung Galaxy S23",
    description: "Smartphone Android con 256GB. Pantalla AMOLED 2X, Cámara 50MP.",
    price: 999.00,
    stock: 120,
    isVisible: true,
    images: ["https://full-store-api-39oh.vercel.app/imagenes/SamsungS23.webp"],
    categoryName: "Smartphones",
  },
  {
    name: "Figura Spy x Family - Yor Forger",
    description: "Figura coleccionable de 30 cm. Material PVC premium.",
    price: 59.99,
    stock: 200,
    isVisible: true,
    images: ["https://full-store-api-39oh.vercel.app/imagenes/yorForge.webp"],
    categoryName: "Coleccionables y Anime",
  },
  {
    name: "Monitor Gamer 27\"",
    description: "100Hz, 1ms, QHD. Panel IPS con soporte G-Sync.",
    price: 449.99,
    stock: 35,
    isVisible: true,
    images: ["https://full-store-api-39oh.vercel.app/imagenes/Monitor-Gamer.webp"],
    categoryName: "Electrónica y Monitores",
  },
];

async function main() {
  console.log("🌱 Limpiando base de datos antes del seed...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.movement.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.productPrice.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.store.deleteMany();

  console.log("🌱 Insertando estructura base...");

  const adminRole = await prisma.role.create({
    data: {
      name: "Administrador",
      description: "Control total del sistema de inventario y ventas",
    },
  });

  const store = await prisma.store.create({
    data: {
      name: "Tienda Principal",
    },
  });

  const branch = await prisma.branch.create({
    data: {
      storeId: store.storeId,
      name: "Sucursal Central",
      address: "Av. Principal, Local 1",
    },
  });

  const hashedPassword = hashPassword("admin123");
  await prisma.user.create({
    data: {
      name: "Administrador General",
      email: "admin@tienda.com",
      password: hashedPassword,
      roleId: adminRole.roleId,
      storeId: store.storeId,
    },
  });

  console.log("🌱 Insertando categorías y productos...");

  for (const item of productosData) {
    let category = await prisma.category.findFirst({
      where: { name: item.categoryName },
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: item.categoryName },
      });
    }

    const product = await prisma.product.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        isVisible: item.isVisible,
        images: item.images,
        categoryId: category.categoryId,
        storeId: store.storeId,
      },
    });

    await prisma.stock.create({
      data: {
        productId: product.productId,
        branchId: branch.branchId,
        quantity: item.stock,
        type: "IN",
      },
    });
  }

  console.log("✅ Seed completado exitosamente.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el ejecutable de seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });