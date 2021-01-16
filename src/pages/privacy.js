import Head from "next/head";
import styled from "styled-components";

const Privary = () => {
    return (
        <>
            <Head>
                <title>citychat.io</title>
            </Head>
            <PrivacyMain>
                <span className="title">Privacy Policy</span>
                <p className="text">
                    Your privacy is important to us. It is citychat.io&apos;s
                    policy to respect your privacy regarding any information we
                    may collect from you across our website, https://citychat.io
                    and other sites we own and operate.
                </p>

                <p className="text">
                    We only ask for personal information when we truly need it
                    to provide a service to you. We collect it by fair and
                    lawful means, with your knowledge and consent. We also let
                    you know why we’re collecting it and how it will be used.
                </p>

                <p className="text">
                    We only retain collected information for as long as
                    necessary to provide you with your requested service. What
                    data we store, we’ll protect within commercially acceptable
                    means to prevent loss and theft, as well as unauthorized
                    access, disclosure, copying, use or modification.
                </p>

                <p className="text">
                    We don’t share any personally identifying information
                    publicly or with third-parties, except when required to by
                    law.
                </p>

                <p className="text">
                    Our website may link to external sites that are not operated
                    by us. Please be aware that we have no control over the
                    content and practices of these sites, and cannot accept
                    responsibility or liability for their respective privacy
                    policies.
                </p>

                <p className="text">
                    You are free to refuse our request for your personal
                    information, with the understanding that we may be unable to
                    provide you with some of your desired services.
                </p>

                <p className="text">
                    Your continued use of our website will be regarded as
                    acceptance of our practices around privacy and personal
                    information. If you have any questions about how we handle
                    user data and personal information, feel free to contact us.
                </p>

                <p className="text">
                    This policy is effective as of 29 November 2020.
                </p>
            </PrivacyMain>
        </>
    );
};

const PrivacyMain = styled.div`
    max-width: 78rem;
    padding: 2rem;
    margin: auto;
    .title {
        font-size: 3rem;
        font-weight: 800;
        text-align: center;
        display: block;
        margin-bottom: 5rem;
    }
    .text {
        margin-bottom: 3rem;
        line-height: 1.9em;
        &:last-child {
            font-weight: 600;
        }
    }
`;

export default Privary;
