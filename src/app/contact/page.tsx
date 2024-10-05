/* eslint-disable react/react-in-jsx-scope */
export default function Contact() {
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Get in Touch</h1>
        <p className="text-lg mb-6 text-center">
          Ready to take your business to the next level? We&apos;d love to hear from you.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-lg mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="name"
            />
          </div>
          <div>
            <label className="block text-lg mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              id="email"
            />
          </div>
          <div>
            <label className="block text-lg mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              id="message"
              rows={5}
            ></textarea>
          </div>
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    );
  }
  