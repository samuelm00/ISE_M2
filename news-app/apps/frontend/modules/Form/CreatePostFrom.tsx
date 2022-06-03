import { IDiscussionPostPropsCreate } from '@news-app/api-model';
import React from 'react';

interface CreatePostFormProps {
  inputs: IDiscussionPostPropsCreate;
  setInputs: React.Dispatch<React.SetStateAction<IDiscussionPostPropsCreate>>;
  onSubmit: () => Promise<void>;
  submitButton: React.ReactNode;
}

export default function CreatePostForm({
  inputs,
  setInputs,
  onSubmit,
  submitButton,
}: CreatePostFormProps) {
  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit();
      }}
      className="space-y-8"
    >
      <textarea
        value={inputs.text}
        className="textarea textarea-primary w-full"
        name="text"
        required
        placeholder="Pleans enter a text"
        onChange={handleOnChange}
      />
      {submitButton}
    </form>
  );
}
