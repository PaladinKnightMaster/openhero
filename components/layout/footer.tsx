"use client";

import { Icon } from "@iconify/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto w-full border-t border-border bg-background px-6 pb-8 pt-16 md:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Icon
                icon="solar:play-circle-bold"
                width="22"
                className="text-accent"
              />
              <span className="text-lg font-black uppercase tracking-tighter text-foreground">
                openhero
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              A free, open-source gallery of cinematic video hero sections.
              Preview, download the video, and grab source code in HTML, React,
              or Next.js - ready to use in any project.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">
              Resources
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a href="#gallery" className="transition-colors hover:text-foreground">
                  Browse Gallery
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Submit a Hero
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">
              Community
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a
                  href="/privacy"
                  target="_blank"
                  className="transition-colors hover:text-foreground"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  target="_blank"
                  className="transition-colors hover:text-foreground"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-border pt-8 text-xs text-muted md:flex-row">
          <p>
            Copyright &copy; {currentYear} openhero. All rights reserved.
          </p>
          <div className="mt-4 flex items-center gap-4 md:mt-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Icon icon="mdi:github" width="20" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
