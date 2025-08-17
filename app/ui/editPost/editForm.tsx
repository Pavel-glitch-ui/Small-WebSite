"use client";
import { useState, useEffect } from "react";
import type { Post } from "@/lib/types";
import { MarkDownEditor } from "../createPost/Markdown/Markdown"; 
import { useActionState } from "react";
import { State, editPost } from "@/lib/api/editPost";


export function EditForm({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description)
  const init: State = {
    message: null,
    errors: {}
  }
  const [loading, setLoading] = useState(false);
  const [state, formAction] = useActionState(editPost, init);
  let clearTriger = false;


  const handleClear = () => {
    setDescription('');
    setTitle('');
    clearTriger = true;
  }


  useEffect(() => {
    if(state?.message === 'ok'){
      setLoading(false)
    }
  })


  return (
    <form
      action={formAction}
      className="max-w-2xl mt-12 mx-auto p-6 bg-gray-50 rounded-lg shadow-md space-y-6"
      onSubmit={handleClear}
    >

      <div>
        <label
          htmlFor="title"
          className="block text-gray-700 font-medium mb-1"
        >
          Заголовок
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Введите заголовок"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-gray-700 font-medium mb-1"
        >
          Описание
        </label>
        <input
          id="description"
          name="description"
          type="text"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Введите описание"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <input type="hidden" name="id" id="id" className="hidden" value={String(post.id)}/>
      <div>
        <label
          htmlFor="content"
          className="block text-gray-700 font-medium mb-1"
        >
          Содержимое
        </label>
        <MarkDownEditor defaultValue={String(post.content)} triger={clearTriger}/>
        </div>
        <div id="content-error" aria-live="polite" aria-atomic="true">
        {state?.errors && state.errors.content?.map((e: string) => (
          <p key={e} className=" mt-2 text-sm text-red-500">
            {e}
          </p>
        ))}
        </div>
        <button className={`py-2 px-4 rounded-md text-gray-100  bg-indigo-500 hover:bg-indigo-400 w-30 h-10`} onClick={() => {setLoading(true)}} type="submit" >{`${loading ? 'Отправляем...' : 'Отправить'}`}</button>
        {state?.message === 'ok' ? (<p className="mt-2 text-sm text-green-400">
          Успешно!
        </p>) : (
          <p className="mt-2 text-sm text-red-500">
            {state?.message}
          </p>
        )}
    </form>
  );
}
