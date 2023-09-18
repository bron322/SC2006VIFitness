import React, {useState} from 'react';
import './styles/profilePage1.css'

export default function ProfilePage() {
  const [click, setClick] = useState(false);
  const [hover, setHover] = useState(false);

  const handleClick = () => setClick(!click);
  // const [activeTab, setActiveTab] = useState("knowledge");
  // const [isSearchFocused, setSearchFocused] = useState(false);

  // const toggleMenu = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  // const selectTab = (target) => {
  //   setActiveTab(target);
  // };

  // const handleInputFocus = () => {
  //   setSearchFocused(true);
  // };

  // const handleInputBlur = () => {
  //   setSearchFocused(false);
  // };
  
  // $('#menu-toggle,#menu-overlay').click(function(){
  //   $('body').toggleClass('open-menu');
  // });
  
  // $('#main-nav li a').click(function(){
  //   $('#main-nav li').removeClass('active');
  //   $(this).parent().addClass('active')
  // });
  
  // $('#tabs li').click(function(){
  //   var clickTarget = $(this).attr('data-target');
  //   $('.tab-target').removeClass('targeted');
  //   $('#'+clickTarget).addClass("targeted");
  //   $('#tabs li').removeClass('active');
  //   $(this).addClass('active')
  // });
  
  // $('#admin-search input').on('focus',function(){
  //   $('#header_logo').addClass('hidden');
  // });
  // $('#admin-search input').on('blur',function(){
  //   $('#header_logo').removeClass('hidden');
  // });


  return (
    <>
      <div className="profile-wrapper">
        {/* <h1>Root display for user page</h1> */}

        <div id="menu-overlay" ></div>
        <div id="menu-toggle" className="closed" data-title="Menu">
          <i className="fa fa-bars"></i>
          <i className="fa fa-times"></i>
        </div>
          
        <header id="main-header">
          <nav id="sidenav">
            <div id="sidenav-header">
              <div id="profile-picture">
                <img src="http://www.gravatar.com/avatar/fa4df8540bab3cb38f7dfa60c6e0522c.png"/>
              </div>
              <a href="#" id="profile-link">Jesse Couch</a>
            </div>
            <div>
              <a href="#" data-title="Home"><i className="fa fa-home"></i></a>
              <a href="#" id="messages" data-title="Messages" data-newmessages="1"><i className="fa fa-inbox"></i></a>
              <a href="#" data-title="Settings"><i className="fa fa-cog"></i></a>
            </div>

            <ul id="main-nav">
              <li className="active">
                <a href="#">
                  <i class="fa fa-tachometer"></i>
                  Dashboard
                </a>
              </li>
                <li>
                  <a href="#">
                    <i className="fa fa-check-square-o"></i>
                    Tasks
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-user"></i>
                    Contacts
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-calendar"></i>
                    Calendar
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-life-ring"></i>
                    FAQs
                  </a>
                </li>
            </ul>
          </nav>
          <form id="admin-search">
            <input type="text" id="search-field" placeholder="Search"/>
            <label for="search-field" id="search-label" title="Search"><i className="fa fa-search"></i></label>
          </form>
          <div id="header_logo">
            <a href="#">Logo</a>
          </div>
        </header>

        <section id="content">
          <header id="content-header">
            Header content
          </header>
          <nav id="tabs">
            <ul>
              <li>Knowledge</li>
              <li data-target="activity" >Activity</li>
              <li data-target="friends">Friends</li>
            </ul>
          </nav>
          <div className="tab-target targeted" id="knowledge">
            <p>Knowledge Content</p>
            <p>Bushwick VHS single-origin coffee, direct trade selfies Tonx chillwave fashion axe McSweeney's roof party four loko Williamsburg ugh. Hashtag farm-to-table keytar, gentrify roof party Vice stumptown polaroid sriracha fingerstache Intelligentsia bitters. You probably haven't heard of them 8-bit pickled pug, cardigan photo booth Schlitz Kickstarter pork belly art party raw denim street art readymade single-origin coffee Carles. Banh mi Pinterest cliche, YOLO ennui quinoa salvia brunch messenger bag twee kitsch sartorial. Cornhole bitters chambray irony, wayfarers PBR&B disrupt Marfa. Austin ennui bespoke Schlitz shabby chic, meggings iPhone. Wes Anderson kale chips you probably haven't heard of them, freegan Vice scenester seitan Cosby sweater Schlitz pop-up dreamcatcher butcher artisan Truffaut roof party.</p>

            <p>Flexitarian art party keffiyeh, PBR&B seitan Carles Godard XOXO cred Brooklyn pickled. YOLO synth butcher post-ironic, pop-up organic artisan banjo PBR try-hard dreamcatcher plaid messenger bag brunch distillery. McSweeney's cray squid, roof party Blue Bottle irony kitsch before they sold out lo-fi asymmetrical shabby chic twee Tonx pickled try-hard. Artisan hella you probably haven't heard of them selvage, jean shorts locavore photo booth fanny pack mumblecore flannel before they sold out semiotics. Intelligentsia sustainable semiotics fanny pack distillery chillwave deep v, VHS dreamcatcher biodiesel synth. Locavore quinoa American Apparel, tote bag skateboard bespoke Wes Anderson pork belly cliche cred Brooklyn blog authentic flexitarian. Try-hard cray Pitchfork, hella Truffaut flexitarian sartorial sriracha Williamsburg Cosby sweater plaid meggings Helvetica.</p>
          </div>
          <div className="tab-target" id="activity" onClick={handleClick}>
            Activity Content
          </div>
          <div className="tab-target" id="friends" onClick={handleClick}>
            Friends Content
          </div>
        </section> 
        
      </div>
    </>
  );
}
