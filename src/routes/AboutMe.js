// Desc: About Me page

import React from 'react';
import styles from '../styles/AboutMe.module.css';

const AboutMe = () => {
    return (
        <div className={styles.about}>
            <h1>Hello Coding Enthusiasts!</h1>
            <p>
                I'm Suhasini, a tech enthusiast exploring the exciting realms of Java and React. During the day, I dive into the coding universe, creating solutions and navigating the ever-changing tech landscape.
            </p>

            <h2>Who Am I?</h2>
            <p>
                A fervent explorer of software realms, I'm on a mission to blend creativity with technology. As I journey through Java and React, I'm not just chasing code; I'm seeking opportunities to innovate and grow.
            </p>

            <h2>Embracing Challenges</h2>
            <p>
                Why the leap into Java and React? I thrive on challenges and continuous learning. Transitioning to these technologies is my way of staying at the forefront of the tech wave and expanding my skill set.
            </p>

            <h2>Open to Collaborate</h2>
            <p>
                Beyond coding, I'm open to exciting opportunities—whether it's internships or job roles. If you share a passion for cutting-edge tech and creative solutions, let's connect! Together, we can explore the boundless possibilities.
            </p>

            <h2>Connect with Me</h2>
            <p>
                Are you a seasoned developer, a fellow learner, or someone curious about the tech landscape? Let's geek out together! Drop me an email at <a href="mailto:suhasinibpatil09@gmail.com">suhasinibpatil09@gmail.com</a>, or connect on LinkedIn <a href="https://www.linkedin.com/in/suhasinibpatil09/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/suhasinibpatil09/</a>.
            </p>

            <p>
                Thanks for stopping by, and here's to the exciting coding journey ahead!
            </p>

            <p>
                Happy coding,
                <br />
                Suhasini
            </p>
        </div>
    );
};

export default AboutMe;