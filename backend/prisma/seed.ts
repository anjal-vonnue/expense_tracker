import { PrismaClient, CategoryType } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "alice@example.com" },
      update: {},
      create: {
        name: "Alice Johnson",
        email: "alice@example.com",
        passwordHash:
          "$2b$12$czemFFTSaORnTsE10nYiYu.OiYPcm8qHaSI4t8jvbnLKSow87aTK6",
      },
    }),
    prisma.user.upsert({
      where: { email: "bob@example.com" },
      update: {},
      create: {
        name: "Bob Smith",
        email: "bob@example.com",
        passwordHash:
          "$2b$12$czemFFTSaORnTsE10nYiYu.OiYPcm8qHaSI4t8jvbnLKSow87aTK6",
      },
    }),
    prisma.user.upsert({
      where: { email: "charlie@example.com" },
      update: {},
      create: {
        name: "Charlie Brown",
        email: "charlie@example.com",
        passwordHash:
          "$2b$12$czemFFTSaORnTsE10nYiYu.OiYPcm8qHaSI4t8jvbnLKSow87aTK6",
      },
    }),
    prisma.user.upsert({
      where: { email: "diana@example.com" },
      update: {},
      create: {
        name: "Diana Wilson",
        email: "diana@example.com",
        passwordHash:
          "$2b$12$czemFFTSaORnTsE10nYiYu.OiYPcm8qHaSI4t8jvbnLKSow87aTK6",
      },
    }),
    prisma.user.upsert({
      where: { email: "ethan@example.com" },
      update: {},
      create: {
        name: "Ethan Davis",
        email: "ethan@example.com",
        passwordHash:
          "$2b$12$czemFFTSaORnTsE10nYiYu.OiYPcm8qHaSI4t8jvbnLKSow87aTK6",
      },
    }),
  ]);

  // Sample expense data
  const expenseData: {
    title: string;
    amount: string;
    category: CategoryType;
    notes?: string;
    expenseDate: Date;
    userId: number;
  }[] = [
    // Alice
    {
      title: "Grocery shopping",
      amount: "1250.50",
      category: CategoryType.food,
      notes: "Weekly groceries",
      expenseDate: new Date("2026-10-01"),
      userId: users[0].id,
    },
    {
      title: "Uber ride",
      amount: "320.00",
      category: CategoryType.transport,
      notes: "Ride to office",
      expenseDate: new Date("2026-10-02"),
      userId: users[0].id,
    },
    {
      title: "New headphones",
      amount: "2499.00",
      category: CategoryType.shopping,
      expenseDate: new Date("2026-10-03"),
      userId: users[0].id,
    },
    {
      title: "Electricity bill",
      amount: "1850.75",
      category: CategoryType.bills,
      expenseDate: new Date("2026-10-04"),
      userId: users[0].id,
    },
    {
      title: "Movie tickets",
      amount: "600.00",
      category: CategoryType.entertainment,
      expenseDate: new Date("2026-10-05"),
      userId: users[0].id,
    },

    // Bob
    {
      title: "Lunch at restaurant",
      amount: "450.00",
      category: CategoryType.food,
      notes: "Lunch with colleagues",
      expenseDate: new Date("2026-10-01"),
      userId: users[1].id,
    },
    {
      title: "Monthly bus pass",
      amount: "1200.00",
      category: CategoryType.transport,
      expenseDate: new Date("2026-10-02"),
      userId: users[1].id,
    },
    {
      title: "Casual shoes",
      amount: "1999.00",
      category: CategoryType.shopping,
      expenseDate: new Date("2026-10-03"),
      userId: users[1].id,
    },
    {
      title: "Internet bill",
      amount: "999.00",
      category: CategoryType.bills,
      expenseDate: new Date("2026-10-04"),
      userId: users[1].id,
    },
    {
      title: "Gaming subscription",
      amount: "499.00",
      category: CategoryType.entertainment,
      expenseDate: new Date("2026-10-05"),
      userId: users[1].id,
    },

    // Charlie
    {
      title: "Coffee and snacks",
      amount: "275.00",
      category: CategoryType.food,
      expenseDate: new Date("2026-10-02"),
      userId: users[2].id,
    },
    {
      title: "Petrol",
      amount: "1800.00",
      category: CategoryType.transport,
      expenseDate: new Date("2026-10-03"),
      userId: users[2].id,
    },
    {
      title: "Books",
      amount: "850.00",
      category: CategoryType.shopping,
      notes: "Programming books",
      expenseDate: new Date("2026-10-04"),
      userId: users[2].id,
    },
    {
      title: "Water bill",
      amount: "350.00",
      category: CategoryType.bills,
      expenseDate: new Date("2026-10-05"),
      userId: users[2].id,
    },
    {
      title: "Concert tickets",
      amount: "2500.00",
      category: CategoryType.entertainment,
      expenseDate: new Date("2026-10-06"),
      userId: users[2].id,
    },

    // Diana
    {
      title: "Dinner",
      amount: "950.00",
      category: CategoryType.food,
      expenseDate: new Date("2026-10-01"),
      userId: users[3].id,
    },
    {
      title: "Train ticket",
      amount: "750.00",
      category: CategoryType.transport,
      expenseDate: new Date("2026-10-02"),
      userId: users[3].id,
    },
    {
      title: "Skincare products",
      amount: "1450.00",
      category: CategoryType.shopping,
      expenseDate: new Date("2026-10-03"),
      userId: users[3].id,
    },
    {
      title: "Mobile recharge",
      amount: "399.00",
      category: CategoryType.bills,
      expenseDate: new Date("2026-10-04"),
      userId: users[3].id,
    },
    {
      title: "Streaming subscription",
      amount: "299.00",
      category: CategoryType.entertainment,
      expenseDate: new Date("2026-10-05"),
      userId: users[3].id,
    },

    // Ethan
    {
      title: "Weekly groceries",
      amount: "1750.00",
      category: CategoryType.food,
      expenseDate: new Date("2026-10-01"),
      userId: users[4].id,
    },
    {
      title: "Cab fare",
      amount: "425.00",
      category: CategoryType.transport,
      expenseDate: new Date("2026-10-02"),
      userId: users[4].id,
    },
    {
      title: "Backpack",
      amount: "1299.00",
      category: CategoryType.shopping,
      expenseDate: new Date("2026-10-03"),
      userId: users[4].id,
    },
    {
      title: "Gas bill",
      amount: "850.00",
      category: CategoryType.bills,
      expenseDate: new Date("2026-10-04"),
      userId: users[4].id,
    },
    {
      title: "Bowling",
      amount: "700.00",
      category: CategoryType.entertainment,
      expenseDate: new Date("2026-10-05"),
      userId: users[4].id,
    },
  ];

  // Add additional expenses to reach 50
  const extraExpenses = [
    {
      title: "Street food",
      amount: "180.00",
      category: CategoryType.food,
      userId: users[0].id,
    },
    {
      title: "Auto rickshaw",
      amount: "120.00",
      category: CategoryType.transport,
      userId: users[1].id,
    },
    {
      title: "Desk organizer",
      amount: "650.00",
      category: CategoryType.shopping,
      userId: users[2].id,
    },
    {
      title: "House rent",
      amount: "12000.00",
      category: CategoryType.bills,
      userId: users[3].id,
    },
    {
      title: "Board game",
      amount: "850.00",
      category: CategoryType.entertainment,
      userId: users[4].id,
    },
    {
      title: "Pharmacy",
      amount: "320.00",
      category: CategoryType.others,
      userId: users[0].id,
    },
    {
      title: "Office supplies",
      amount: "540.00",
      category: CategoryType.others,
      userId: users[1].id,
    },
    {
      title: "Phone case",
      amount: "399.00",
      category: CategoryType.shopping,
      userId: users[2].id,
    },
    {
      title: "Laundry",
      amount: "250.00",
      category: CategoryType.others,
      userId: users[3].id,
    },
    {
      title: "Gym membership",
      amount: "1500.00",
      category: CategoryType.others,
      userId: users[4].id,
    },
    {
      title: "Breakfast",
      amount: "220.00",
      category: CategoryType.food,
      userId: users[0].id,
    },
    {
      title: "Parking fee",
      amount: "100.00",
      category: CategoryType.transport,
      userId: users[1].id,
    },
    {
      title: "T-shirt",
      amount: "799.00",
      category: CategoryType.shopping,
      userId: users[2].id,
    },
    {
      title: "Water can delivery",
      amount: "80.00",
      category: CategoryType.bills,
      userId: users[3].id,
    },
    {
      title: "Museum entry",
      amount: "350.00",
      category: CategoryType.entertainment,
      userId: users[4].id,
    },
    {
      title: "Tea and snacks",
      amount: "150.00",
      category: CategoryType.food,
      userId: users[0].id,
    },
    {
      title: "Metro ticket",
      amount: "75.00",
      category: CategoryType.transport,
      userId: users[1].id,
    },
    {
      title: "Kitchen utensils",
      amount: "1100.00",
      category: CategoryType.shopping,
      userId: users[2].id,
    },
    {
      title: "Internet recharge",
      amount: "499.00",
      category: CategoryType.bills,
      userId: users[3].id,
    },
    {
      title: "Amusement park",
      amount: "1800.00",
      category: CategoryType.entertainment,
      userId: users[4].id,
    },
    {
      title: "Vegetables",
      amount: "300.00",
      category: CategoryType.food,
      userId: users[0].id,
    },
    {
      title: "Bike service",
      amount: "2200.00",
      category: CategoryType.transport,
      userId: users[1].id,
    },
    {
      title: "Notebook",
      amount: "120.00",
      category: CategoryType.shopping,
      userId: users[2].id,
    },
    {
      title: "Home cleaning",
      amount: "600.00",
      category: CategoryType.others,
      userId: users[3].id,
    },
    {
      title: "Birthday gift",
      amount: "999.00",
      category: CategoryType.others,
      userId: users[4].id,
    },
  ] satisfies {
    title: string;
    amount: string;
    category: CategoryType;
    userId: number;
  }[];

  await prisma.expense.createMany({
    data: [
      ...expenseData,
      ...extraExpenses.map((expense, index) => ({
        ...expense,
        expenseDate: new Date(
          `2026-10-${String(6 + (index % 5)).padStart(2, "0")}`,
        ),
      })),
    ],
  });

  console.log(`Created/verified ${users.length} users.`);
  console.log(`Created ${expenseData.length + extraExpenses.length} expenses.`);
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
