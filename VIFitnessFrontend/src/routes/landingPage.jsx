import Header from "../components/headerlanding";
import './styles/landingPage.css'
import BG from './styles/photos/background.jpg'

export default function LandingPage() {
  return (
    <>
      <div className="landing-page-wrapper">
        <Header />

        <div className="image-container">
        <img
              src = {BG}
              alt = "LOGO"></img>
        </div>

        <section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis ultrices urna.</p>
            <p>Sed in interdum urna, nec hendrerit mi. Nam congue ligula ut lacus vehicula, ut sodales metus semper.</p>
            <p>Fusce eget vehicula odio, et sollicitudin purus.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis ultrices urna.</p>
            <p>Sed in interdum urna, nec hendrerit mi. Nam congue ligula ut lacus vehicula, ut sodales metus semper.</p>
            <p>Fusce eget vehicula odio, et sollicitudin purus.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis ultrices urna.</p>
            <p>Sed in interdum urna, nec hendrerit mi. Nam congue ligula ut lacus vehicula, ut sodales metus semper.</p>
            <p>Fusce eget vehicula odio, et sollicitudin purus.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis ultrices urna.</p>
            <p>Sed in interdum urna, nec hendrerit mi. Nam congue ligula ut lacus vehicula, ut sodales metus semper.</p>
            <p>Fusce eget vehicula odio, et sollicitudin purus.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis ultrices urna.</p>
            <p>Sed in interdum urna, nec hendrerit mi. Nam congue ligula ut lacus vehicula, ut sodales metus semper.</p>
            <p>Fusce eget vehicula odio, et sollicitudin purus.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis ultrices urna.</p>
            <p>Sed in interdum urna, nec hendrerit mi. Nam congue ligula ut lacus vehicula, ut sodales metus semper.</p>
            <p>Fusce eget vehicula odio, et sollicitudin purus.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis ultrices urna.</p>
            <p>Sed in interdum urna, nec hendrerit mi. Nam congue ligula ut lacus vehicula, ut sodales metus semper.</p>
            <p>Fusce eget vehicula odio, et sollicitudin purus.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis ultrices urna.</p>
            <p>Sed in interdum urna, nec hendrerit mi. Nam congue ligula ut lacus vehicula, ut sodales metus semper.</p>
            <p>Fusce eget vehicula odio, et sollicitudin purus.</p>
        </section>

      </div>
    </>
  );
}

