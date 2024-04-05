import React from 'react'
import Header from '../../layout/Header'
import "./n.css"
import {NotFoundView} from "../../sections/error";
import ThemeProvider from "../../theme";
import Footer from "../../layout/Footer";
export default function NotFound() {
  return (
      <div className="flex flex-col min-h-screen overflow-hidden">
          {/*  Site header */}

          <Header />

          {/*  Page content */}
          <main className="flex-grow">

              <ThemeProvider>
                  <NotFoundView />
              </ThemeProvider>
          </main>

          {/*  Site footer */}
          <Footer />

      </div>




  )
}
