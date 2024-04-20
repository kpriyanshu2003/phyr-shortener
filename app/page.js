import { CommandIcon, IconRight } from "@/static/icons";
import { Button, Kbd } from "@nextui-org/react";

export default function Home() {
  return (
    <div>
      <nav className="h-20">
        <div className="flex h-full items-center max-w-7xl mx-auto justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-neutral-200 rounded-full"></div>
            <h2 className=" font-semibold ml-4 text-lg">Shortener.</h2>
          </div>

          <ul className="flex items-center space-x-8 text-sm">
            <li>Home</li>
            <li>Pricing</li>
            <li>API Docs</li>
            <li>Customization</li>
            <li>Products</li>
          </ul>

          <div className="flex items-center space-x-7">
            <Button
              radius="full"
              className="bg-neutral-900 text-white w-fit px-4"
            >
              <div className="flex space-x-2 px-2 items-center">
                <span>Paste</span>
                <CommandIcon />
              </div>
            </Button>
            <button className="text-sm">Feedback</button>
          </div>
        </div>
      </nav>

      <div className="py-[1px] bg-gradient-to-r from-gray-50 to-gray-50 via-lime-100">
        <div className="py-3 bg-gradient-to-r from-white/90 to-white/90 via-white/80 flex items-center">
          <div className="w-fit flex items-center text-neutral-800 text-sm mx-auto">
            <span className="h-8 w-8 flex items-center justify-center bg-lime-100 rounded-full mr-4">
              🎉
            </span>
            <span>API documentation is now available</span>
            <span className="ml-3">
              <IconRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
