import "../../../../index.css"
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import Input from "../../../../components/UI/form/Input";

export default {
    title: 'components/UI/form/Input',
    component: Input,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    type: "text",
    label: 'Label',
};