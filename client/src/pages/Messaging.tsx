import { Header } from "@/components/Header";

export default function Messaging() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-10">
        {/* Main messages page with split view */}
        <div className="flex h-screen">
          {/* Left sidebar - Messages list */}
          <div className="w-1/3 border-r border-gray-300">
            {/* Sidebar header */}
            <div className="p-4 border-b border-gray-300">
              <h3 className="text-lg font-bold">Messages</h3>
            </div>

            {/* Messages list */}
            <div className="overflow-y-auto h-[calc(100vh-61px)]">
              {/* Sample message item */}
              <div className="p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center">
                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full bg-gray-400 mr-3"></div>

                  {/* User info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">John Doe</h4>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      Hey there! How are you doing?
                    </p>
                  </div>
                </div>
              </div>

              {/* More message items would go here */}
              <div className="p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-400 mr-3"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Jane Smith</h4>
                      <span className="text-xs text-gray-500">3h ago</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      Hey sounds good! Just working on some projects.
                    </p>
                    {/* <br/> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Message thread */}
          <div className="flex-1 flex flex-col h-[calc(100vh-73px)]">
            {/* Message thread header */}
            <div className="ps-2 border-b border-gray-300 items-center justify-between min-h-[61px] flex ">
              <h3 className="text-xl font-bold">
                Conversation with Jane Smith
              </h3>
              <p className="text-xs pr-2 text-gray-500 font-bold">Online</p>
            </div>
            {/* Messages container */}
            <div className="flex-1 p-4 overflow-y-auto">
              {/* Received message */}
              {/* <div className="mb-4">
                <div className="bg-gray-200 rounded-lg p-3 max-w-xs">
                  <p>Hey there! How are you doing today?</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                  10:30 AM
                </span>
              </div> */}

              {/* Sent message */}
              <div className="mb-4 flex justify-end">
                <div>
                  <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
                    <p>Hey there! Would you like to collab later?</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block text-right">
                    10:32 AM
                  </span>
                </div>
              </div>

              {/* Received message */}
              <div className="mb-4">
                <div className="bg-gray-400 rounded-lg p-3 max-w-xs">
                  <p>Hey sounds good! Just working on some projects.</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                  10:35 AM
                </span>
              </div>
            </div>
            {/* end of message block*/}

            {/* Message input */}
            <div className="mt-auto p-4 border-t border-gray-300">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 text-gray-900 rounded-l-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white px-6 rounded-r-lg font-medium hover:bg-blue-600 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
