// FILEPATH: /d:/Scaler Notes/Java/movie-frontend/src/__tests__/MovieApp.test.js

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieApp from '../components/MovieApp';

test('renders Home component for / route', () => {
    //mock the authcontext
    const mockAuthContext = {
        user: {
            loggedIn: false,
            token: null,
            username: null
        },
        handleSetUser: () => { },
        handleUnsetUser: () => { }
    };

    render(
        <MemoryRouter initialEntries={['/']}>
            <MovieApp />
        </MemoryRouter>
    );

    // Replace 'Home' with actual text or element from Home component
    const homeElement = screen.getByText('Genre');
    expect(homeElement).toBeInTheDocument();
});

test('renders AboutMe component for /about route', () => {
    render(
        <MemoryRouter initialEntries={['/about']}>
            <MovieApp />
        </MemoryRouter>
    );

    // Replace 'About Me' with actual text or element from AboutMe component
    const aboutElement = screen.getByText('Who Am I?');
    expect(aboutElement).toBeInTheDocument();
});

test('renders Login component for /login route', () => {
    render(
        <MemoryRouter initialEntries={['/login']}>
            <MovieApp />
        </MemoryRouter>
    );

    // Replace 'Login' with actual text or element from Login component
    const loginElement = screen.getByText('Login');
    expect(loginElement).toBeInTheDocument();
});

test('renders Signup component for /signup route', () => {
    render(
        <MemoryRouter initialEntries={['/signup']}>
            <MovieApp />
        </MemoryRouter>
    );

    // Replace 'Signup' with actual text or element from Signup component
    const signupElement = screen.getByText('Create Account');
    expect(signupElement).toBeInTheDocument();
});

// test('renders MovieDetails component for /:movieId route', () => {
//     render(
//         <MemoryRouter initialEntries={['/1']}>
//             <MovieApp />
//         </MemoryRouter>
//     );

//     // Replace 'Movie Details' with actual text or element from MovieDetails component
//     const movieDetailsElement = screen.getByText('Released');
//     expect(movieDetailsElement).toBeInTheDocument();
// });

test('renders Not Found for non-existent route', () => {
    render(
        <MemoryRouter initialEntries={['/non-existent-route']}>
            <MovieApp />
        </MemoryRouter>
    );

    const notFoundElement = screen.getByText('Not Found');
    expect(notFoundElement).toBeInTheDocument();
});