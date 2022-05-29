import { IDiscussionTopicProps } from '@news-app/api-model';
import React, { useCallback } from 'react';
import { getCategories } from '../Api/category/api.category';
import Button from '../Button/Button';
import { useFetch } from '../common/hooks/common.hooks';
import LoadingSpinner from '../Spinner/LoadingSpinner';

interface CreateTopicFormProps {
  inputs: Omit<IDiscussionTopicProps, 'id'>;
  setInputs: React.Dispatch<
    React.SetStateAction<Omit<IDiscussionTopicProps, 'id'>>
  >;
  onSubmit: () => Promise<void>;
  submitButton: React.ReactNode;
}

export default function CreateTopicForm({
  inputs,
  setInputs,
  onSubmit,
  submitButton,
}: CreateTopicFormProps) {
  const getCategoriesMemo = useCallback(() => getCategories(), []);
  const { data, isLoading } = useFetch(getCategoriesMemo);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    console.log(e.target.value);
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
      <input
        value={inputs.title}
        type="text"
        onChange={handleOnChange}
        name="title"
        required
        placeholder="Please enter a title"
        className="input input-bordered input-primary w-full"
      />
      <select
        value={inputs.discussionCategoryId}
        onChange={handleOnChange}
        name="discussionCategoryId"
        className="select select-primary w-full"
      >
        <option value={-1}>Please Select a Category</option>
        {data?.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <textarea
        value={inputs.text}
        className="textarea textarea-primary w-full"
        name="text"
        placeholder="Pleans enter a text"
        onChange={handleOnChange}
      />
      {submitButton}
    </form>
  );
}
