import { Phone } from "@deemlol/next-icons";
import { Mail } from "@deemlol/next-icons";
import { MapPin } from "@deemlol/next-icons";
import { Linkedin } from "@deemlol/next-icons";
import { Github } from "@deemlol/next-icons";
import { Twitter } from "@deemlol/next-icons";

export default function Footer() {
  return (
    <div className="bg-gray-950 px-16 py-6 w-screen flex flex-col gap-5">
      <div className="flex fle-row gap-10 items-center">
        <a href="/" className="text-3xl text-white font-extrabold">
          Nativk
        </a>
        <div className="w-[1px] h-[150px] bg-gray-700"></div>
        <div className="flex gap-12">
          <ul className="flex flex-col">
            <div className="py-3">
              <div>
                <h1 className="text-white text-2xl font-bold ">Services</h1>
              </div>
              <div className="w-[150px] h-[1px] bg-white"></div>
            </div>
            <div className="flex flex-col ">
              <a
                className="text-gray-400 text-sm hover:border-b-white hover:border-b"
                href=""
              >
                Perfil
              </a>
              <a
                className="text-gray-400 text-sm hover:border-b-white hover:border-b"
                href=""
              >
                Measurement
              </a>
              <a
                className="text-gray-400 text-sm hover:border-b-white hover:border-b"
                href=""
              >
                Tasks
              </a>
              <a
                className="text-gray-400 text-sm hover:border-b-white hover:border-b"
                href=""
              >
                Foods
              </a>
              <a
                className="text-gray-400 text-sm hover:border-b-white hover:border-b"
                href=""
              >
                Notes
              </a>
            </div>
          </ul>
          <ul className="flex flex-col">
            <div className="py-3">
              <div>
                <h1 className="text-white text-2xl font-bold ">Explore</h1>
              </div>
              <div className="w-[150px] h-[1px] bg-white"></div>
            </div>
            <div className="flex flex-col ">
              <a
                className="text-gray-400 text-sm hover:border-b-white hover:border-b"
                href=""
              >
                About Us
              </a>
              <a
                className="text-gray-400 text-sm hover:border-b-white hover:border-b"
                href=""
              >
                FAQs
              </a>
              <a
                className="text-gray-400 text-sm hover:border-b-white hover:border-b"
                href=""
              >
                Privacy Policy
              </a>
            </div>
          </ul>
          <ul className="flex flex-col">
            <div className="py-3">
              <div>
                <h1 className="text-white text-2xl font-bold ">Contact</h1>
              </div>
              <div className="w-[150px] h-[1px] bg-white"></div>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row items-center gap-3">
                <Phone color="#fff" size={14} />
                <p className="text-gray-400 text-sm hover:border-b-white hover:border-b">
                  (+54) 1234-1234
                </p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <MapPin color="#fff" size={14} />
                <p className="text-gray-400 text-sm hover:border-b-white hover:border-b">
                  Argentina, Buenos Aires
                </p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <Mail color="#fff" size={14} />
                <p className="text-gray-400 text-sm hover:border-b-white hover:border-b">
                  Nativk@gmail.com
                </p>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[100%] h-[1px] bg-gray-900"></div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-row w-full items-center justify-between">
          <div>
            <p className="text-gray-600">© 2024 Nativk, All Rights Reserved</p>
          </div>
          <div className="flex flex-row gap-3 self-end">
            <Github color="#fff" size={20} />
            <Linkedin color="#fff" size={20} />
            <Twitter color="#fff" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
