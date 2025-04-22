import React from 'react';
import pic1 from '../assets/pals/main.jpeg';

const DeveloperCard = ({ name, imageUrl, description, facebookUrl }) => {
  return (
    <a
      href={facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block bg-black rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 h-60"
    >
      <img
        alt={name}
        src={imageUrl}
        className="absolute inset-0 h-full w-full rounded-lg object-cover filter blur-sm transition-all duration-300 group-hover:blur-none"
      />
      <div className="relative p-1">
        <p className="text-sm font-bold text-white">{name}</p>
        <div className="mt-1">
          <div className="translate-y-2 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-xs text-white">{description}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

const Cog = () => {
  const developers = [
    {
      name: 'Vince Christian Gaurino',
      imageUrl: 'https://avatars.githubusercontent.com/u/119119995?v=4',
      facebookUrl: 'https://web.facebook.com/VnCi.23/',
    },
    {
      name: 'Jan Anferney Ibe',
      imageUrl: 'https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-1/474464271_2937458683095896_7757944510268823606_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFAdpQyoXVVAu14qQGJBXmDGi3xeY4gMHoaLfF5jiAweqiHxf5ZcA5i8UYQMoGzKjR48fUgmPjN6pwjVK6WtNtk&_nc_ohc=MTVGKKzL0TEQ7kNvwFWGeMh&_nc_oc=AdmszgN_LCDyi2HDrLr--LQHf0-u9zD5V6jZSfjyhX1_tcJ9_g3Dywi90et4s6TbxD4&_nc_zt=24&_nc_ht=scontent.fmnl4-1.fna&_nc_gid=2OOuZW7zyWHklzhzkhchEA&oh=00_AfEQd5z6fVM7AHsW6LyMtG43pzvALLCCFmEpnNp1-onCrw&oe=680BEB25',
      facebookUrl: 'https://web.facebook.com/anferni.pascual',
    },
    {
      name: 'John Jefferson Obenza',
      imageUrl: 'https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-1/321679820_554611656257453_5827475266012655675_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=110&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeF_JkBg8oRQYUFiAh44sdn2AmBa6iyjQ3ECYFrqLKNDcZGDGzvHwajAWwcZ7mArWFDG8lVHC5GESa3mklF4sKSH&_nc_ohc=dHXk5H6FZkQQ7kNvwFFa57G&_nc_oc=AdlR96tCATEnJo_NGWeQv6_szpvoq7fMdbU2m15Wt-IwzaqVv5j_0NrvYPyGkcUKT0k&_nc_zt=24&_nc_ht=scontent.fmnl4-3.fna&_nc_gid=DmNNO2ISxfR2Ke0WigC1jQ&oh=00_AfEwZI0wPiStDdXKP2268PGt-Ul2s9By10vTpnuUOjSx1g&oe=680BEA49',
      facebookUrl: 'https://web.facebook.com/john.jefferson.obenza',
    },
    {
      name: 'Revic Dolot',
      imageUrl: 'https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/476099936_646429797914269_5258227456530312955_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFbLbgghN6IB8tNVdV8CqKTVI93Z4Xeob9Uj3dnhd6hvxEqkZr-ZqoQ7UsLbw9Vh9I6Jx6dY1e0ZW05-llpeBFd&_nc_ohc=KZ2rQgDvxR0Q7kNvwGD3iMu&_nc_oc=AdnfbPVd2gG2-XLtumd9GOW8kTYEEfMNrLLWaFXOfXRMmV4rSv8XjGIcptvqsLzvlqM&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=86LLnZfhczWVXxOdsIlWiQ&oh=00_AfEXjOGGAhbaj2XmSFgSyGuLa1fUIZpPqXr3MWchv3TaXQ&oe=680BF203',
      facebookUrl: 'https://web.facebook.com/wwwvsooo',
    },
    {
      name: 'Carlo Noveno',
      imageUrl: 'https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-1/472027625_2281230818942604_5347704721136624266_n.jpg?stp=dst-jpg_s240x240_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEUenl1PPsgMuYqeHocf2ZA_0nXIn8OjdH_Sdcifw6N0endfhk-z8wqJ7hZ8aEOf2Jm9uhb9-UXestEtJ21VF9H&_nc_ohc=j4KHBd1Cf-IQ7kNvwFLCjcw&_nc_oc=Adkv1ewevRGR2gXSQY7MC30o5qeCLGtfRRxSlpCiEMx_ivz9RPKYJ1ZHLlfOmGVCpXs&_nc_zt=24&_nc_ht=scontent.fmnl4-1.fna&_nc_gid=UMzKAen8BGmrxjQGxolIDQ&oh=00_AfG7OZ675IPcqEOR44Vmpsx95PQHytC5ScqEMKAR92mRjA&oe=680C1130',
      facebookUrl: 'https://web.facebook.com/carlo.noveno.77',
    },
    {
      name: 'Marc Arronn Abejo',
      imageUrl: 'https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-1/481038216_1309829796924963_2931438369185493321_n.jpg?stp=c61.141.1036.1036a_dst-jpg_s720x720_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeH0ahItOgA9sJpkIx7CLRtZpN17VKNO0xGk3XtUo07TEdr6rnzqiVeF76qhfBXoyc4xWPzmX01xekkrae5iuQG5&_nc_ohc=lZv2WrKLVVUQ7kNvwG_goOk&_nc_oc=AdmlnpNP5tkp_gpvdgdx4Y8lDtjEJ_7dcgZizss0wcUOWz2dfQ_EFPrTKOdKJzt9dY8&_nc_zt=24&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=YZJScnofodwjm0-YsPlu_A&oh=00_AfGb2K5TI2ATlO67LkMHqkebjjWc8qK7-IQV0fMvH96XmA&oe=680C0F8E',
      facebookUrl: 'https://web.facebook.com/marc.abejo',
    },
    {
      name: 'Albert Anthony Napal',
      imageUrl: 'https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-1/473421672_1152741692939750_5306481121576327304_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFHxrGPIMmN-eZ_F1Jkz_WIhyy6-76VOqyHLLr7vpU6rDEi_y984i55fSmFpqyZxkiA6vXHg4SKUQLsxKShIE2s&_nc_ohc=M7IyJiNHJjsQ7kNvwG-R8k5&_nc_oc=AdkjrQvkXa9pIh4X7WYgwrY6YGdYGhV2HBXAqSyvrB2tF0PQI24zoQGgtEtOUDELztg&_nc_zt=24&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=PqQv3ZbxrqnHQdz5y-WOKA&oh=00_AfEUEMpl-IPed7df9zuvQCwxR1OSbWou_r_dc2gUHYzsNw&oe=680C1515',
      facebookUrl: 'https://web.facebook.com/FredChicken16',
    },
    {
      name: 'Christian Enrico Reyes',
      imageUrl: 'https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/472959483_1133843431439924_8220212534282010902_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeH5nmmqjyU8009kBNleA-nm-umi0ivt3d366aLSK-3d3e1JMsv1q8tiAL3c31opdYxzs3K0hQ8Q2KlooKCWicRV&_nc_ohc=rNG10C_JQ0MQ7kNvwHElcwk&_nc_oc=AdmM4rJcTVJnnn4YMMoB28DSs_8dqp-DSfmlDehRrAsibnd5xu5jDdrMZwfTNefTVv8&_nc_zt=23&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=MNK-QnjW36lRteBH3KQ82g&oh=00_AfEcybT7hzxCBK5w0pf4l5YB3W3rqU9pCrwxpkJbbvzggA&oe=680C1185',
      facebookUrl: 'https://web.facebook.com/christian.enrico.reyes.2024',
    },
    {
      name: 'Johnsin Almonguera',
      imageUrl: 'https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/481906476_1304410167503192_8716525025069497123_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHb8ID7p7v8ncWQzVN200259A_I6rRSPvD0D8jqtFI-8CjFVycROnhh8GC_hHBKfvtL971YP79-xENo77UsRB0F&_nc_ohc=l_lWkkYlIz0Q7kNvwGfTHd-&_nc_oc=Adl0aBuZV0--CrsjJR6B7rGDZZCQQRpbRfrwnFKRa7vTjqFFU-A4e4tdWDGcfWGu_ss&_nc_zt=23&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=0eSKxy4rYwPMvsAAbWfeoA&oh=00_AfHwI1X1SSqxtwuYSWIByb8mrtu3yGl6PspFdf-vjcYrKw&oe=680BEB76',
      facebookUrl: 'https://web.facebook.com/johnsin.almonguera',
    },
  ];

  return (
    <div className="bg-blue-800 relative overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pic1})` }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <p className="text-sm md:text-xl mt-8 text-white font-medium">
              This mini capstone project was developed by third-year students at MakSci, starting from a simple idea that gradually grew into a fully realized project. Built entirely from scratch, it reflects our creativity, problem-solving skills, and dedication to learning.
            </p>
          </div>
        </div>
      </section>

      {/* Developer Cards */}
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-xl font-bold text-yellow-400 text-center mb-5">
          Meet the Creators
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {developers.map((dev, index) => (
            <DeveloperCard
              key={index}
              name={dev.name}
              imageUrl={dev.imageUrl}
              description={dev.description}
              facebookUrl={dev.facebookUrl}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white py-2">
        <div className="container mx-auto text-center">
          <p className="text-xs">
            © 2025 Ginggoy's System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Cog;