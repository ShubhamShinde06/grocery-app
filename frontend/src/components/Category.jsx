import React from "react";

const Category = () => {

  const data = [
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725888087/binkeyit/rqs2ac9wwpdkcbzd7om6.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725882539/binkeyit/xgw4tbydzhakirfzm8fo.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725882610/binkeyit/uz3opyestu20xwosazao.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725883962/binkeyit/npxpsdy0ratuttkvx18g.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955270/binkeyit/omc8nnhamvbccqeu7pdk.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955285/binkeyit/arbeviqib8aq8zhfhn1e.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955298/binkeyit/qac2jr23yg1ci4ayuxp2.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955316/binkeyit/lmvmyyjdm6vdgwhqazve.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955332/binkeyit/cu8vuutqxqecw9zzq16c.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955345/binkeyit/zbuwc8rsfpsynbuxhjww.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955359/binkeyit/ffe08r08hzochuxguaoo.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955401/binkeyit/fce1p10lpskkvqduvn44.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955422/binkeyit/uw0sexbgyjyttv5gmm0l.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955434/binkeyit/o9lsnshrzq5pfgtmnaay.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955446/binkeyit/nvs1gwzo5tlptcu4ghet.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955459/binkeyit/lx9a2ktgjscrhapdd8sy.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955471/binkeyit/gcoussznta0gjo0xjyiw.png",
    },
    {
      img: "http://res.cloudinary.com/dljwfy0pe/image/upload/v1725955482/binkeyit/jclivpy8oq8sdsjjk07p.png",
    },
  ];

  return (
    <div className=" w-full flex flex-wrap gap-5 justify-center ">
      {data.map((item, index) => (
        <div key={index + 1} className="md:w-32 md:h-40 w-15 h-30 overflow-hidden">
          <img src={item.img} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default Category;
