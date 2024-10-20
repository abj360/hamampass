import { Paths } from "@/lib/pageroutes";

export const Documents: Paths[] = [
  {
    title: "Introduction",
    href: "/introduction",
    heading: "Getting started",
    items: [
      {
        title: "Installation",
        href: "/installation",
      },
      {
        title: "Setup",
        href: "/setup",
      },
      {
        title: "Changelog",
        href: "/changelog",
      },
    ],
  },
  {
    spacer: true,
  },

  {
    title: "Pages",
    href: "/structure",
    heading: "Structure",
    items: [
      {
        title: "User",
        href: "/user",
        items: [
          {
            title: "Home",
            href: "/home",
          },
          {
            title: "properties",
            href: "/properties",
            items: [
              {
                title: "property",
                href: "/single",
              },
            ],
          },
          {
            title: "my bookings",
            href: "/bookings",
          },
          {
            title: "wishlist",
            href: "/wishlist",
          },
          {
            title: "shopping cart",
            href: "/shopping-cart",
          },
          {
            title: "my profile",
            href: "/my-profile",
          },
          {
            title: "help",
            href: "/help",
          },
          {
            title: "login",
            href: "/login",
          },
          {
            title: "what is hammam",
            href: "/what-is-hammam",
          },
          {
            title: "hamburger menu",
            href: "/hamburger",
          },
        ],
      },
      {
        title: "Admin",
        href: "/admin",
        items: [
          {
            title: "home",
            href: "/home",
          },
          {
            title: "price update",
            href: "/price-update",
          },
          {
            title: "bookings",
            href: "/bookings",
            items: [
              {
                title: "booking",
                href: "/booking",
              },
            ],
          },
          {
            title: "hamburger menu",
            href: "/hamburger",
          },
        ],
      },
    ],
  },
  {
    spacer: true,
  },
  {
    title: "Markup",
    href: "/markup",
    heading: "Components",
    items: [
      {
        title: "Cards",
        href: "/cards",
      },
      {
        title: "Diagrams",
        href: "/diagrams",
      },
      {
        title: "Filetree",
        href: "/filetree",
      },
      {
        title: "Lists",
        href: "/lists",
      },
      {
        title: "Maths",
        href: "/maths",
      },
      {
        title: "Notes",
        href: "/notes",
      },
      {
        title: "Steps",
        href: "/steps",
      },
      {
        title: "Table",
        href: "/table",
      },
      {
        title: "Tabs",
        href: "/tabs",
      },
    ],
  },
];
