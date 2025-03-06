import { useState, useEffect } from 'react'
import Page from '../../components/page';
import Frame from '../../components/frame';

function About() {

    return (
        <>
            <Page>
                <p>Omnivim is the brainchild of three students from Waterloo, Canada: Amit Weis, Daniel Li and Derek Gou. Perpetually dreading the loss of their beloved vim motions upon alt+tabbing to a different window, they built Omnivim to make vim motions global, eliminating the need for a mouse or trackpad and streamlining users' workflows.</p>
                <hr/>
                <Frame>
                    <img className="max-w-80" src="/20250223_185642.jpeg"></img>
                </Frame>
                <p className="max-w-80 text-[0.9rem]">The Omnivim team after placing 3rd overall among 450+ hackers at Hack Canada</p>
                <hr/>
                <p>We're currently rebuilding Omnivim in Rust, implementing customizability via Lua or Vimscript, and launching an all-OS compatible app. Omnivim will be fully launched in a few months - sign up for our email list to be notified when we launch.</p>
            </Page>
        </>
    )
}

export default About