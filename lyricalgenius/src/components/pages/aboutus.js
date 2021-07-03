import React, { Component } from 'react';
import './aboutus.css';
import githublogo from '../../images/icons/whitegithub.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa } from '@fortawesome/free-solid-svg-icons'

class AboutUs extends Component {
    render() {
        return (
            <div>
                <div class="py-5 darkbackground">
                    <div class="container py-5 rounded textcontainer">
                        <h1 class="display-4 aboutuslargetext">Behind LyricalGenius</h1>
                        <p class="lead aboutussmalltext">
                            LyricalGenius was started by four Temple University students as a class project. We wanted to create a quick and easy
                            way to search for and send lyrics to friends and family. At the time of development, COVID-19 was a huge issue and 
                            we felt that not only was it important to be able to reach out to loved ones, lyrics often put into words what we struggled
                            to convey. Thus, LyricalGenius was born.
                        </p>
                    </div>
                    <div class="container py-5 rounded textcontainer">
                        {/*  */}
                        <div class="row mb-4">
                            <div class="col-lg-9">
                                <h2 class="display-4 font-weight-light aboutuslargetext">Meet the Team</h2>
                                <p class="font-italic lead aboutussmalltext">These are the developers that have made LyricalGenius possible.</p>
                            </div>
                        </div>

                        <div class="row text-center">
                            <div class="col-xl-3 col-sm-6 mb-5">
                                <div class="rounded py-5 px-4">
                                    <h5 class="mb-0 aboutuslargetext">Jason Xhoxhi</h5><span class="small text-uppercase text-muted job">Developer</span>
                                    <ul class="social mb-0 list-inline mt-3">
                                    <a href="https://github.com/JasonXhoxhi" title=""><img src={githublogo} class="icon" /></a>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-3 col-sm-6 mb-5">
                                <div class="rounded py-5 px-4">
                                    <h5 class="mb-0 aboutuslargetext">Kyle Skelly</h5><span class="small text-uppercase text-muted job">Developer</span>
                                    <ul class="social mb-0 list-inline mt-3">
                                        <a href="https://github.com/Kyle-Skelly" title=""><img src={githublogo} class="icon" /></a>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-3 col-sm-6 mb-5">
                                <div class="rounded py-5 px-4">
                                    <h5 class="mb-0 aboutuslargetext">Johnny Gangoo</h5><span class="small text-uppercase text-muted job">Developer</span>
                                    <ul class="social mb-0 list-inline mt-3">
                                    <a href="https://github.com/johnnygangoo" title=""><img src={githublogo} class="icon" /></a>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-3 col-sm-6 mb-5">
                                <div class="rounded py-5 px-4">
                                    <h5 class="mb-0 aboutuslargetext">Vlad K</h5><span class="small text-uppercase text-muted job">Developer</span>
                                    <ul class="social mb-0 list-inline mt-3">
                                    <a href="https://github.com/NotASpamBot" title=""><img src={githublogo} class="icon" /></a>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUs;