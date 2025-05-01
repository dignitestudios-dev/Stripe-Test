import React from "react";

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="custom-shadow w-full bg-white p-7 md:p-10 radius flex flex-col items-start gap-5"
    >
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="name" className="font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Jane Smith"
          required
          className="w-full py-3 px-5 bg-gray-100 rounded-xl outline-none"
        />
      </div>
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="jamesmith@gmail.com"
          required
          className="w-full py-3 px-5 bg-gray-100 rounded-xl outline-none"
        />
      </div>
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="phone" className="font-medium">
          Phone
        </label>
        <input
          type="number"
          id="phone"
          name="phone"
          placeholder="17472920712"
          required
          className="w-full py-3 px-5 bg-gray-100 rounded-xl outline-none"
        />
      </div>
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="message" className="font-medium">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Write your message here..."
          rows="5"
          required
          className="w-full py-3 px-5 bg-gray-100 rounded-xl outline-none"
        ></textarea>
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="rounded-xl py-3 text-center w-full bg-blue-600 text-white font-semibold"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
