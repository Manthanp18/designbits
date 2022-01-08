import { PrismaClient, Prisma } from "@prisma/client"

const db = new PrismaClient()

async function seed() {
  const usersData = await getUsers()
  await Promise.all(
    usersData.map(user => {
      return db.user.create({
        data: {
          email: user.email,
          name: user.name,
        },
      })
    }),
  )
}

seed()

async function getUsers(): Promise<Prisma.UserCreateInput[]> {
  return [
    {
      email: "shreyas@designbits.io",
      name: "Shreyas Chaudhary",
    },
    {
      email: "tirth@designbits.io",
      name: "Tirth Gajjar",
    },
  ]
}

function _iGetArticles() {
  return [
    {
      id: 1,
      title: "Bottom navigation drag utility",
      slug: "/1",
      source: {
        logo: "https://basecamp.com/basecamp-icon-196x196.png",
        name: "Basecamp",
      },
      author: {
        name: "Leslie",
        profile: "/leslie",
      },
      likes: 106,
      comments: {
        count: 6,
      },
      views: "1.2k",
      backgroundColorClass: "bg-yellow-50",
    },
    {
      id: 2,
      title: "Collapse side navigation on-hover",
      slug: "/2",
      source: {
        logo: "//logo.clearbit.com/loom.com",
        name: "Loom",
      },
      author: {
        name: "Leslie",
        profile: "/leslie",
      },
      likes: 106,
      comments: {
        count: 6,
      },
      views: "1.2k",
      backgroundColorClass: "bg-indigo-50",
    },
    {
      id: 3,
      title: "Icon transition micro animation",
      slug: "/3",
      source: {
        logo: "//logo.clearbit.com/telegram.org",
        name: "Telegram",
      },
      author: {
        name: "Wade Warren",
        profile: "/wade-warren",
      },
      likes: 106,
      comments: {
        count: 6,
      },
      views: "1.2k",
      backgroundColorClass: "bg-gray-200",
    },
    {
      id: 4,
      title: "Swipe down to refresh animation",
      slug: "4",
      source: {
        logo: "//logo.clearbit.com/dribbble.com/",
        name: "Dribbble",
      },
      author: {
        name: "Leslie",
        profile: "/leslie",
      },
      likes: 106,
      comments: {
        count: 6,
      },
      views: "1.2k",
      backgroundColorClass: "bg-orange-50",
    },
    // More products...
  ]
}
