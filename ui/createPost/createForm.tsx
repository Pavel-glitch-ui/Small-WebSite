"use client";
import { useState, useEffect } from "react";
import { MarkDownEditor } from "./Markdown/Markdown";
import { useActionState } from "react";
import { State, createPost } from "@/lib/api/createPost";


export default function PostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const init: State = {
    message: null,
    errors: {}
  }


  const [state, formAction] = useActionState(createPost, init)
  let clearTriger = false
  const handleClear = () => {
      setTitle('');
      setDescription('');
      clearTriger = true;
  }


  useEffect(() => {
    if(state?.message === 'ok'){
      setLoading(false)
    }
  }, [state?.message])


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
          value={title}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Введите описание"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-gray-700 font-medium mb-1"
        >
          Содержимое
        </label>
        <MarkDownEditor triger={clearTriger}/>
        
        </div>
        <div id="content-error" aria-live="polite" aria-atomic="true">
        {state?.errors && state.errors.content?.map((e: string) => (
          <p key={e} className=" mt-2 text-sm text-red-500">
            {e}
          </p>
        ))}
        </div>
        <button className={`py-2 px-4 rounded-md text-gray-100  bg-indigo-500 hover:bg-indigo-400 w-35 h-10 text-center`} type="submit" onClick={() => {setLoading(true)}}>{`${loading ? 'Отправляем...' : 'Отправить'}`}</button>
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
