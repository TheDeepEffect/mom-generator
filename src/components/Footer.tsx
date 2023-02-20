import Linkedin from "../icons/icons8-linkedin.json"
import Github from "../icons/icons8-github.json"
import Lottie from 'react-lottie';
import styles from "./../styles/Footer.module.css";

export default function Footer() {
    return <footer className={styles.footer}>
        <div className={styles.title}>
            <h1>Minutes of Meeting generator with GPT3</h1>
        </div>
        <div className={styles.branding}>
            <a href="https://in.linkedin.com/in/deepmanek25" target={"_blank"}>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: Linkedin,
                    }}
                />
            </a>
            <a href="https://github.com/TheDeepEffect/mom-generator" target={"_blank"}>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: Github,
                    }}
                />
            </a>
            <div>
                All icon by <a target="_blank" href="https://icons8.com">Icons8</a>
            </div>
        </div>
    </footer>
}