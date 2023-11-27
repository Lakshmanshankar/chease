import { Raleway } from "next/font/google"

const rale = Raleway({ weight: "300", subsets: ["vietnamese"] });
export default function Home() {
  return <div className={`${rale.className}`}>
    <h1> CHEASE</h1>
    <h2> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, quisquam sed autem iusto quibusdam, illum repudiandae facere est hic quidem molestiae et in! Repellat, esse. Velit vitae quibusdam suscipit officiis.</h2>:
  </div>
}
