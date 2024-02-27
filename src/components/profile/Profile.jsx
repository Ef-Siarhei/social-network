import MyPosts from "./MyPosts/MyPosts";
import p from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={p.content}>
      <div className={p.header_img}>
        <img
          className={p.img_1}
          src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
          alt=""
        />
      </div>
      <div>
        <img
          className={p.img_2}
          src="https://www.researchgate.net/publication/328101815/figure/fig3/AS:678371700772865@1538747825499/Original-image-of-Lena-200X200-pixels.ppm"
          alt=""
        />
        <div>Description</div>
      </div>
      <MyPosts />
    </div>
  );
}
