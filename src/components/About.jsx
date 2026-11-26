import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../data/constants"

export default function About() {
  return (
    <section id="about" className="bg-ocean text-white">
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">எங்கள் கதை</h2>
          <p className="text-white/80 mb-4 leading-relaxed">
            Mandaadi Fresh Seafoods ஒரு எளிய வாக்குறுதியோடு ஆரம்பித்தது — கடலோர குடும்பங்கள் நம்பும்
            அதே புதிய, மெய்யான கடல் உணவை சென்னை &amp; பெங்களூரு வீட்டு வாசல்களுக்கு கொண்டு வருவது.
          </p>
          <p className="text-white/80 mb-6 leading-relaxed">
            ஒவ்வொரு பிடிப்பும் தினமும் நேரடியாக வாங்கப்பட்டு, சுத்தமா handle பண்ணி, வேகமா டெலிவரி
            ஆகுது — middleman இல்ல, freshness-ல compromise இல்ல. அதனாலதான் 20,000+ followers எங்க
            page-ஐ தினமும் நம்புறாங்க.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-ocean font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
          >
            📸 {INSTAGRAM_HANDLE}-ஐ Follow பண்ணுங்க
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Narrow-barred_Spanish_mackerel_%28Scomberomorus_commerson%29.jpg/500px-Narrow-barred_Spanish_mackerel_%28Scomberomorus_commerson%29.jpg",
              pos: "center 20%",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Liat_Portal_for_Foodie_Disorder_-_Fresh_jumbo_shrimp_from_San_Francisco_farmers_market.jpg/500px-Liat_Portal_for_Foodie_Disorder_-_Fresh_jumbo_shrimp_from_San_Francisco_farmers_market.jpg",
              pos: "center",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Live_Mud_Crabs.jpg/500px-Live_Mud_Crabs.jpg",
              pos: "center 35%",
            },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Pomfret_fishes.jpg/500px-Pomfret_fishes.jpg",
              pos: "center",
            },
          ].map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt="Fresh seafood"
              className="w-full h-32 md:h-36 object-cover rounded-xl"
              style={{ objectPosition: img.pos }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
