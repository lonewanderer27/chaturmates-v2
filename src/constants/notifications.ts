import {personCircleOutline} from "ionicons/icons";

export const notifications = [
  {
    id: 1,
    title: "Johnna Doe has accepted your request to join CS-301",
    date: new Date(),
    icon: personCircleOutline,
  },
  {
    id: 2,
    title: "John Doe has sent you friend request",
    date: new Date(),
    icon: personCircleOutline,
    buttons: [
      {
        color: "primary",
        title: "Accept",
      },
      {
        title: "Decline",
      },
    ],
  },
  {
    id: 3,
    title: "CS301 has a new announcement",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ex feugiat, condimentum mauris vel, pretium est. Donec vitae molestie dui. Aenean tincidunt eget mauris eget auctor.",
    date: new Date(),
    icon: personCircleOutline,
  },
  {
    id: 4,
    title: "Johnna Doe has mentioned you in a ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ex feugiat, condimentum mauris vel, pretium est. Donec vitae molestie dui. Aenean tincidunt eget mauris eget auctor.",
    date: new Date(),
    icon: personCircleOutline,
  },
  {
    id: 5,
    title: "Adamson has an announcement",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ex feugiat, condimentum mauris vel, pretium est. Donec vitae molestie dui. Aenean tincidunt eget mauris eget auctor.",
    date: new Date(),
    icon: personCircleOutline,
  },
  {
    id: 6,
    title: "New Message from Jane Smith",
    description:
      "Hi there! Just wanted to check in and see how you're doing. Let's plan to meet up soon!",
    date: new Date(),
    icon: personCircleOutline,
  },
  {
    id: 7,
    title: "Friend Request from Michael Johnson",
    description:
      "Hi there! Just wanted to check in and see how you're doing. Let's plan to meet up soon!",
    date: new Date(),
    icon: personCircleOutline,
    buttons: [
      {
        color: "primary",
        title: "Accept",
      },
      {
        title: "Decline",
      },
    ],
  },
  {
    id: 8,
    title: "TBI for 1st Semester is now available",
    description: "Heads up, Klasmeyts! Please be informed that the Teacher’s Behavior Inventory (TBI) for the 1st Semester is now available.",
    date: new Date(),
    icon: personCircleOutline,
  },
  {
    id: 9,
    title: "TBI Procedures for Clearance Due to Non-compliance",
    description: "Procedures for Clearance Due to Non-compliance with the Teacher’s Behavior Inventory (TBI) of the 1st Semester of SY 2023-2024",
    date: new Date(),
    icon: personCircleOutline,
  }
];
