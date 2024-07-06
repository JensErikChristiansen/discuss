'use client';

import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { createTopic } from '@/actions';
import { useFormState } from 'react-dom';

export default function CreateTopicForm() {
  const [formState, dispatch] = useFormState(createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">New Topic</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form action={dispatch}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>

            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
            />

            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
            />

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
