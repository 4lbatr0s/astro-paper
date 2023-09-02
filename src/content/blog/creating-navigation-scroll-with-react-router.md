---
author: Serhat Oner
pubDatetime: 2023-09-02
title: Creating Navigation Scroll with React Router
postSlug: creating-navigation-scroll-with-react-router
featured: true
draft: false
tags:
  - react
  - web-development
  - javascript
  - react-router-dom
  - user-interface
ogImage: "https://res.cloudinary.com/practicaldev/image/fetch/s--_bS1dmNu--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bohilxedfl6ijlltfyeq.png"
description: Learn how to implement a smooth navigation scroll component in a React.js project to enhance user experience while navigating between routes.
---

## Table of Contents

1. Introduction
2. Prerequisites
3. Building the Navigation Scroll Component
4. Integrating the Component in Your React App
5. Testing with MainRoutes
6. Conclusion

## 1. Introduction

Smooth navigation is a crucial aspect of user experience in web development. When users navigate through different sections or routes of your website, providing them with a seamless scrolling experience can greatly enhance their interaction with your application. In this blog post, we'll explore how to create a **Navigation Scroll Component** in a React.js project.

Our goal is to automatically scroll the page to the top whenever the user changes routes. We'll achieve this by leveraging React.js, the `react-router-dom` library for routing, and a custom component called `NavigationScroll`. This component will smoothly scroll the page to the top whenever a new route is accessed.

So, let's dive into the details and learn how to implement this feature step by step.

## 2. Prerequisites

Before we start, make sure you have the following prerequisites in place:

- A React.js project set up.
- Basic knowledge of React.js and the `react-router-dom` library.
- Node.js and npm (Node Package Manager) installed on your development machine.

## 3. Building the Navigation Scroll Component

We'll start by creating the `NavigationScroll` component. This component will use the `useLocation` hook from `react-router-dom` to detect route changes and scroll the page to the top smoothly. Here's the code for the `NavigationScroll` component:

```jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const NavigationScroll = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    // Scroll to the top of the page smoothly
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return children || null;
};

NavigationScroll.propTypes = {
  children: PropTypes.node,
};

export default NavigationScroll;
```

This component listens for changes in the `pathname` using the `useEffect` hook. When a change is detected, it scrolls the page to the top with a smooth animation using `window.scroll`.

## 4. Integrating the Component in Your React App

Now that we have our `NavigationScroll` component ready, let's integrate it into our React app. Here's how you can do it:

```jsx
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Routes
import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        {/* Wrap your app with the Router component */}
        <Router>
          {/* Use the NavigationScroll component to handle scrolling */}
          <NavigationScroll>
            <Routes>
              {/* Include your routes using the Routes component */}
              <Route path="/" element={<DashboardDefault />} />
              <Route path="dashboard" element={<DashboardDefault />} />
              <Route path="utils" element={<UtilsTypography />} />
              <Route path="utils/util-color" element={<UtilsColor />} />
              <Route path="utils/util-shadow" element={<UtilsShadow />} />
              <Route path="icons/tabler-icons" element={<UtilsTablerIcons />} />
              <Route path="icons/material-icons" element={<UtilsMaterialIcons />} />
              <Route path="sample-page" element={<SamplePage />} />
            </Routes>
          </NavigationScroll>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
```

In your `App` component, make sure to wrap your entire application with the `BrowserRouter` component from `react-router-dom`. This component will enable route handling in your app. Then, include the `NavigationScroll` component as a parent of your main content, and define your routes using the `Routes` and `Route` components from `react-router-dom`. This way, whenever a route change occurs, the `NavigationScroll` component will automatically scroll the page to the top smoothly, enhancing the user experience.

## 5. Testing with MainRoutes

Now, let's test our navigation scroll component with a sample route configuration. Here's an example route configuration that you can use for testing purposes:

```jsx
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        },
        {
          path: 'util-color',
          element: <UtilsColor />
        },
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        },
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};
```

You can use this `MainRoutes` configuration to replace your existing routes for testing purposes. The `NavigationScroll` component will work seamlessly with this route structure, providing a smooth scrolling experience between routes.

## 6. Conclusion

In this blog post, we've learned how to create a **Navigation Scroll Component** in a React.js project to provide a smooth scrolling experience when navigating between routes. This simple yet effective enhancement can greatly improve the user experience of your web application.

By following the steps outlined above, you can easily implement this feature in your React.js project and create a more user-friendly and visually appealing web application. Happy coding, and may your user navigation be as smooth as butter!