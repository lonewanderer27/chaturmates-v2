import type { Meta, StoryObj } from '@storybook/react';

import GroupCard from '../../components/GroupCard';

const meta = {
  title: 'Discover/GroupCard',
  component: GroupCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    avatar_url: { control: 'text' },
    vanity_id: { control: 'text' },
    members: { control: 'object' },
    cover_url: { control: 'text' },
    icon: { control: 'text' },
  }
} as Meta<typeof GroupCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatar_url: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    cover_url: "https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mdHdhcmUlMjBlbmdpbmVlcnxlbnwwfHwwfHx8MA%3D%3D",
    vanity_id: "se",
    name: "Software Engineering",
    members: [
      {  }, {  }, {  }, {  }, {  }
    ]
  }
}

export const DefaultNoCoverURL: Story = {
  name: "No Cover URL",
  args: {
    avatar_url: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    vanity_id: "se",
    name: "Software Engineering",
    members: [
      {  }, {  }, {  }, {  }, {  }
    ]
  }
}

// export const TaylorSwift: Story = {
//   name: "Taylor Swift",
//   args: {
//     cover_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqI5pWKD_RnFo3h9C1dOvdYFgpzYZ2-YboCA&usqp=CAU",
//     avatar_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBWXUbNCaZOTR3lKievsbkj26tJcD3w8zO2Q&usqp=CAU",
//     vanity_id: "ts",
//     name: "Taylor-Con",
//     members: [
//       { }, { }, { }, { }, { }
//     ]
//   }
// }