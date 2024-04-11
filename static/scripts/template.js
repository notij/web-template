//////////////////////////////////////////////////////////////
/*
  Window Scroll effect
  */
//  It's get from flask and html
// scroll_effect_height = window.scroll_effect_height || scroll_effect_height;
// if top-nav item is hovered
let hovered_flag = false;
window.addEventListener("scroll", function () {
  const top_nav = this.document.querySelector(".top-nav");
  const navbox = this.document.querySelectorAll(".navbox");
  const search_input = this.document.getElementById("search-input");
  const search_btn = this.document.getElementById("search-btn");

  if (this.window.scrollY > scroll_effect_height) {
    top_nav.classList.remove("transparent");
    top_nav.classList.remove("white-bg");
    search_input.classList.remove("search-input-transparent");
    search_btn.classList.add("search-btn-scrolled");
    navbox.forEach(function (el) {
      el.classList.remove("transparent");
    });
  } else {
    top_nav.classList.add("transparent");
    search_input.classList.add("search-input-transparent");
    search_btn.classList.remove("search-btn-scrolled");

    navbox.forEach(function (el) {
      el.classList.add("transparent");
    });
    if (hovered_flag) {
      top_nav.classList.add("white-bg");
    }
  }
});
//////////////////////////////////////////////////////////////
/*
  website search
  TODO: add search function
  */
document.addEventListener("DOMContentLoaded", function () {
  var searchInput = document.getElementById("search-input");
  var searchBtn = document.getElementById("search-btn");

  // Function to handle redirection
  function handleSearch() {
    var query = searchInput.value.trim();
    if (query) {
      window.location.href = "/search?query=" + encodeURIComponent(query);
    }
  }

  // Event listener for the Enter key in the input field
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the form from submitting
      handleSearch();
    }
  });

  // Event listener for the search button click
  searchBtn.addEventListener("click", handleSearch);
});
//////////////////////////////////////////////////////////////
/*
Initialize the default settings and set sessionStorage 
*/
cursors = [
  "agent3",
  "agent4",
  "agent8",
  "bigman",
  "callie",
  "captain",
  "hime",
  "inkling",
  "judd",
  "lijudd",
  "marie",
  "marina",
  "shiver",
];
cursor_to_color = {
  agent3: "6EF9AF",
  agent4: "FFDF2C",
  agent8: "FA017E",
  bigman: "4D4C56",
  callie: "ED55B3",
  captain: "AD9B1D",
  hime: "FCE9C6",
  inkling: "17B916",
  judd: "D80C4B",
  lijudd: "68FF53",
  marie: "D7E6E4",
  marina: "420D3D",
  shiver: "3D43CE",
};
cursor_to_color_hsl = {
  agent3: { h: 160, s: 100, l: 50 },
  agent4: { h: 50, s: 100, l: 50 },
  agent8: { h: 320, s: 100, l: 50 },
  bigman: { h: 240, s: 0, l: 33 },
  callie: { h: 320, s: 100, l: 50 },
  captain: { h: 50, s: 100, l: 50 },
  hime: { h: 23, s: 84, l: 93 },
  inkling: { h: 120, s: 100, l: 50 },
  judd: { h: 320, s: 100, l: 50 },
  lijudd: { h: 120, s: 100, l: 50 },
  marie: { h: 180, s: 0, l: 90 },
  marina: { h: 306, s: 67, l: 15 },
  shiver: { h: 240, s: 100, l: 50 },
};
// rgb color
(window.r = 0), (window.g = 0), (window.b = 0);
// hsl color
(window.h = 0), (window.s = 0), (window.l = 0);
// base svg graph hsl color
(window.base_h = 282), (window.base_s = 77), (window.base_l = 50);

const cursor_template = ({ name }) => `
<li>
    <a id="${name}">
        <img class = "invisible" src="static/images/cursors/${name}-pack.png" alt="${name}" id = "${name}" height=40>
    </a>
</li>`;
// Initialize the cursor change events
window.addEventListener("load", (event) => {
  sessionStorage.setItem(
    "cursor",
    sessionStorage.getItem("cursor") != null
      ? sessionStorage.getItem("cursor")
      : "url(static/images/cursors/hime-cursor.png), auto"
  );
  sessionStorage.setItem(
    "pointer",
    sessionStorage.getItem("pointer") != null
      ? sessionStorage.getItem("pointer")
      : "url(static/images/cursors/hime-pointer.png), auto"
  );
  sessionStorage.setItem(
    "cursor_name",
    sessionStorage.getItem("cursor_name")
      ? sessionStorage.getItem("cursor_name")
      : "hime"
  );
  sessionStorage.setItem(
    "ink_color",
    sessionStorage.getItem("ink_color")
      ? sessionStorage.getItem("ink_color")
      : "FCE9C6"
  );
  sessionStorage.setItem(
    "ink_color_hsl",
    sessionStorage.getItem("ink_color_hsl")
      ? sessionStorage.getItem("ink_color_hsl")
      : JSON.stringify(cursor_to_color_hsl["hime"])
  );
  if (sessionStorage.getItem("ink_color") != null) {
    ink_color = sessionStorage.getItem("ink_color");
    window.r = parseInt(ink_color.substring(0, 2), 16);
    window.g = parseInt(ink_color.substring(2, 4), 16);
    window.b = parseInt(ink_color.substring(4, 6), 16);
    ink_color_hsl = JSON.parse(sessionStorage.getItem("ink_color_hsl"));
    window.h = ink_color_hsl.h;
    window.s = ink_color_hsl.s;
    window.l = ink_color_hsl.l;
  }

  // default cursor
  document.documentElement.style.cursor = sessionStorage.getItem("cursor");
  // Function to change cursor and optionally color
  function changeCursorAndColor(name) {
    return function () {
      this.classList.add("hovered-font");
      this.style.cursor = sessionStorage.getItem("pointer");
    };
  }

  // Function to revert the cursor and optionally color
  function revertCursorAndColor() {
    this.classList.remove("hovered-font");
    this.style.cursor = ""; // Revert cursor to default
  }

  // Apply initial cursor change events
  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("mouseover", changeCursorAndColor("hime"));
    el.addEventListener("mouseout", revertCursorAndColor);
  });

  // Assuming cursors is an array of cursor names and cursor_template is a function returning HTML strings
  cursors.forEach((cursor) => {
    document.getElementById("cursor-container").innerHTML += cursor_template({
      name: cursor,
    });
  });

  // Setup cursor change on click for each cursor option
  cursors.forEach((cursor) => {
    document.getElementById(cursor).addEventListener("click", function () {
      sessionStorage.setItem(
        "cursor",
        `url(static/images/cursors/${cursor}-cursor.png), auto`
      );
      sessionStorage.setItem(
        "pointer",
        `url(static/images/cursors/${cursor}-pointer.png), auto`
      );
      sessionStorage.setItem("cursor_name", cursor);
      sessionStorage.setItem("ink_color", cursor_to_color[cursor]);
      sessionStorage.setItem(
        "ink_color_hsl",
        JSON.stringify(cursor_to_color_hsl[cursor])
      );

      document.documentElement.style.cursor = `url(static/images/cursors/${cursor}-cursor.png), auto`;

      document.querySelectorAll("a").forEach((el) => {
        el.removeEventListener("mouseover", changeCursorAndColor); // Remove existing event listener
        el.removeEventListener("mouseout", revertCursorAndColor); // Consistency with adding back the listener

        el.addEventListener("mouseover", changeCursorAndColor(cursor));
        el.addEventListener("mouseout", revertCursorAndColor);
      });
      document.getElementById("cursor-container").style.display = "none";
      setTimeout(() => {
        document.getElementById("cursor-container").style.display = "block";
      }, 200);

      ink_color = sessionStorage.getItem("ink_color");
      window.r = parseInt(ink_color.substring(0, 2), 16);
      window.g = parseInt(ink_color.substring(2, 4), 16);
      window.b = parseInt(ink_color.substring(4, 6), 16);

      ink_color_hsl = JSON.parse(sessionStorage.getItem("ink_color_hsl"));
      window.h = ink_color_hsl.h;
      window.s = ink_color_hsl.s;
      window.l = ink_color_hsl.l;
    });
  });
});
//////////////////////////////////////////////////////////////
/* 
  top-nav items hover state
  */
document.addEventListener("DOMContentLoaded", function () {
  var mainElement = document.getElementById("main-container");
  var allElements = document.querySelectorAll(".navbox");
  var topNavElement = document.querySelector(".top-nav"); // The top-nav element
  // var hovered_flag = false;
  var hovered_item = null;
  // TODO change the linksAndBoxes to the actual links and boxes
  const linksAndBoxes = {
    item1: "item1-box",
    item2: "item2-box",
    item3: "item3-box",
    search: "search-box",
  };

  // Initialize hoverStates with an additional key for top-nav
  function updateVisibility() {
    if (hovered_flag && hovered_item != null) {
      mainElement.classList.add("blur");
      if (this.window.scrollY < scroll_effect_height) {
        topNavElement.classList.add("white-bg");
      }
      allElements.forEach((el) => el.classList.remove("navbox-visible"));
      document.getElementById(hovered_item).classList.add("navbox-visible");
    } else {
      hovered_item = null;
      allElements.forEach((el) => el.classList.remove("navbox-visible"));
      mainElement.classList.remove("blur");
      topNavElement.classList.remove("white-bg");
    }
  }
  Object.keys(linksAndBoxes).forEach((key) => {
    let link = document.getElementById(key);
    let box = document.getElementById(linksAndBoxes[key]);

    // Setup event listeners for each link
    link.addEventListener("mouseover", function () {
      hovered_item = linksAndBoxes[key];
      hovered_flag = true;
      updateVisibility();
    });
    link.addEventListener("mouseout", function () {
      hovered_flag = false;
      setTimeout(updateVisibility, 100); // Delayed check to allow for transitions
    });

    // Setup event listeners for each box
    box.addEventListener("mouseover", function () {
      hovered_item = linksAndBoxes[key];
      hovered_flag = true;
      updateVisibility();
    });
    box.addEventListener("mouseout", function () {
      hovered_flag = false;
      setTimeout(updateVisibility, 100);
    });
  });

  // Event listeners for the top-nav hover state
  topNavElement.addEventListener("mouseover", function () {
    hovered_flag = true;
    updateVisibility();
  });
  topNavElement.addEventListener("mouseout", function () {
    hovered_flag = false;
    setTimeout(updateVisibility, 100); // Delay to smooth transitions
  });

  document.querySelectorAll(".remove-nav-box").forEach((el) => {
    el.addEventListener("mouseover", function () {
      hovered_flag = false;
      hovered_item = null;
      updateVisibility();
    });
  });
});
//////////////////////////////////////////////////////////////
/*
 Function to position the cursor box under the cursor button
 */
function positionCursorBox() {
  const cursorBox = document.getElementById("cursor-box");
  if (cursorBox.classList.contains("option-box-visible")) {
    const btnRect = document
      .getElementById("cursor-btn")
      .getBoundingClientRect();
    const cursorBoxWidth = cursorBox.offsetWidth;
    const leftPosition = btnRect.left + (btnRect.width - cursorBoxWidth);

    cursorBox.style.top = `${btnRect.bottom}px`;
    cursorBox.style.left = `${leftPosition}px`;
    cursorBox.style.position = "fixed";
    document.body.appendChild(cursorBox);
  }
}
document
  .getElementById("cursor-btn")
  .addEventListener("click", function (event) {
    event.stopPropagation();
    const cursorBox = document.getElementById("cursor-box");
    cursorBox.classList.toggle("option-box-visible");
    positionCursorBox();
  });
// Listen for window resize events to adjust the position of the cursor box
window.addEventListener("resize", function () {
  positionCursorBox(); // Re-position the cursor box when the window is resized
});
// Add a click listener to the entire document
document.addEventListener("click", function (event) {
  const cursorBox = document.getElementById("cursor-box");
  if (
    !cursorBox.contains(event.target) &&
    cursorBox.classList.contains("option-box-visible")
  ) {
    cursorBox.classList.remove("option-box-visible");
  }
});
//////////////////////////////////////////////////////////////
/*
  Function to turn on/off cursor effect
 */
const cursor_effect_btns = document.getElementsByClassName("cursor_effect_btn");
let cursor_effect = false; // Make sure this is declared with 'let' for mutability

Array.from(cursor_effect_btns).forEach((el) => {
  el.addEventListener("click", function () {
    // Toggle cursor_effect
    cursor_effect = !cursor_effect;
    if (cursor_effect) {
      document.getElementById("cursor_effect_on").style.display = "inline";
      document.getElementById("cursor_effect_off").style.display = "none";
    } else {
      document.getElementById("cursor_effect_on").style.display = "none";
      document.getElementById("cursor_effect_off").style.display = "inline";
    }
  });
});
document
  .getElementById("cursor_effect_btn2")
  .addEventListener("click", function () {
    cursor_effect = !cursor_effect;
    if (cursor_effect) {
      document.getElementById("cursor_effect_on").style.display = "inline";
      document.getElementById("cursor_effect_off").style.display = "none";
    } else {
      document.getElementById("cursor_effect_on").style.display = "none";
      document.getElementById("cursor_effect_off").style.display = "inline";
    }
  });

//////////////////////////////////////////////////////////////
/*
 Add ink path when cursor moves in the main-container
 */
const container = document.getElementById("main-container");
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomColor() {
  var r = window.r + getRandomInt(-8, 8);
  var g = window.g + getRandomInt(-8, 8);
  var b = window.b + getRandomInt(-8, 8);
  return `rgb(${r},${g},${b})`; // Return the RGB color string
}
container.addEventListener("mousemove", function (e) {
  if (cursor_effect) {
    const rect = container.getBoundingClientRect();
    const point = document.createElement("div");
    point.className = "cursor-point";

    // Adjust positions to be relative to the container
    point.style.left = `${e.clientX - rect.left}px`;
    point.style.top = `${e.clientY - rect.top}px`;

    // Apply a random color to each point
    point.style.backgroundColor = getRandomColor();

    // Randomize size and initial opacity for variability
    const size = Math.random() * 20 + 5; // Size between 5px and 25px
    point.style.width = `${size}px`;
    point.style.height = `${size}px`;
    point.style.opacity = Math.random() * 0.5 + 0.5; // Opacity between 0.5 and 1

    // Apply initial random rotation
    const rotation = Math.random() * 360; // Rotation between 0 and 360 degrees
    point.style.transform = `scale(1) rotate(${rotation}deg)`;

    container.appendChild(point);

    // Start fading and shrinking immediately
    requestAnimationFrame(() => {
      point.style.opacity = 0;
      point.style.transform = `scale(0) rotate(${rotation}deg)`; // Shrink to simulate drying up
    });

    // Remove the dot after it's fully faded to keep the DOM clean
    setTimeout(() => point.remove(), 3000);
  }
});
//////////////////////////////////////////////////////////////
/*
 Add ink splat effect when cursor clicked
 */
const splat_template = ({ id, height }) => `
    <img class = "invisible" src="static/images/splats/${id}.svg" height = ${height}}  >
    `;

container.addEventListener("click", function (e) {
  if (cursor_effect) {
    const rect = container.getBoundingClientRect();
    const splat = document.createElement("div");
    splat.className = "dynamic-svg";
    const height = Math.floor(Math.random() * (150 - 80 + 1)) + 80;
    // Adjust positions to be relative to the container
    splat.style.left = `${e.clientX - rect.left - height / 2}px`;
    splat.style.top = `${e.clientY - rect.top - height / 2}px`;

    const imageId = Math.floor(Math.random() * 18) + 1;

    splat.innerHTML = splat_template({ id: "splat" + imageId, height: height });
    container.appendChild(splat);

    h_filter = window.h - window.base_h;
    s_filter = (window.s / window.base_s) * 100;
    l_filter = (window.l / window.base_l) * 100;
    opa = 0.9;
    cursor_name = sessionStorage.getItem("cursor_name");
    switch (cursor_name) {
      case "hime":
      case "agent3":
      case "agent4":
        opa = 0.3;
        break;
      case "marie":
        opa = 0.4;
        break;
    }

    document.querySelectorAll(".dynamic-svg").forEach((el) => {
      el.style.filter =
        "hue-rotate(" +
        h_filter.toString() +
        "deg) saturate(" +
        s_filter.toString() +
        "%) brightness(" +
        l_filter.toString() +
        "%) opacity(" +
        opa.toString() +
        ")";
    });
    splat.animate(
      [
        { transform: "scale(0)", opacity: 1 },
        {
          transform: "scale(1)",
          left: `${e.clientX - rect.left - 30}px`,
          top: `${e.clientY - rect.top - 40}px`,
          opacity: 1,
        },
      ],
      {
        duration: 100, // Animation duration in milliseconds
        fill: "forwards", // Keep the final state after animation
      }
    );
    setTimeout(() => {
      splat.style.opacity = "0";
      setTimeout(() => container.removeChild(splat), 500); // Remove from DOM after fade out
    }, 1000);
  }
});
//////////////////////////////////////////////////////////////
/*
  about us button
 */
document.addEventListener("DOMContentLoaded", function () {
  // Get the elements
  var aboutUsLink = document.getElementById("about-us");
  var aboutUsContainer = document.getElementById("about-us-container");
  var mainElement = document.getElementById("main-container");
  var topNavElement = document.querySelector(".top-nav");
  // Varnish the about us container if not clicked on
  document.addEventListener("click", function (event) {
    // Check if the click is outside the about us container
    if (
      !aboutUsContainer.contains(event.target) &&
      !aboutUsLink.contains(event.target)
    ) {
      aboutUsContainer.style.display = "none"; // Hide the container
      mainElement.classList.remove("only-blur"); // Remove the blur effect to main content
      topNavElement.classList.remove("only-blur"); // Remove the blur effect to top-nav
      document.body.style.position = ""; // Enable scrolling
    }
  });
  // Add click event listener
  aboutUsLink.addEventListener("click", function () {
    // Check if the about us container is currently visible
    if (aboutUsContainer.style.display == "none") {
      aboutUsContainer.style.display = "block"; // Show the container
      mainElement.classList.add("only-blur"); // Show the blur effect to main content
      topNavElement.classList.add("only-blur"); // Show the blur effect to top-nav
      document.body.style.position = "absolute"; //Disable scrolling
    } else {
      aboutUsContainer.style.display = "none"; // Hide the container
      mainElement.classList.remove("only-blur"); // Remove the blur effect to main content
      topNavElement.classList.remove("only-blur"); // Remove the blur effect to top-nav
      document.body.style.position = ""; //Enable scrolling
    }
  });
});
