import { Github, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer(){
    return <div>
        <footer className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <Link href={"https://x.com/arnav_nehra_"} className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href={"https://github.com/Arnav-Nehra/vessel"} className=" cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-muted-foreground">© 2024 Vessel. Open source and built with care.</p>
        </div>
      </footer>
    </div>
}