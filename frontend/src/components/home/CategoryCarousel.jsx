import React from 'react';

const categories = [
  { id: 1, name: 'Итальянская', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxTHsplD6BTaoMBaP_XQYPnuK4N4QjV28MOtOLevBFDnc0giSgp9alWhd1SAC5vreUarPlzKachaHsUWWU8qX_K2WJ0TseGTX28I_iC_lDyy5MFHlU8n4qm83_wjlQO11T9fsCpegf_PVawC_7XoKUHfTBSfXO0ViQGXJeceixfX-D_-oVVD-us1a_kwi3uqeol7uvAvGwEPdL4NuPpPUk-UWcbiqVRnuz6s_xl5NGNZ-5EoABz4Wj7JGovXqThzGVMwnZNmoI4is' },
  { id: 2, name: 'Японская', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn1E-cK_2kYh27gaqLlusOx3W8D-N3j_ttRBZztMldzvYMcSFbrF6mYQ-MErDTxFXTNsDbuXuLW3OpK5UQkpeN3aLqT13vzhGsXudIkzVCj4C_4jOmcsEzg02otcESiw5MU8GB0t9w75ScGipBG_q6vhR0GFko4iGDISGKQOQJTmoHfQdABHK6LK3eT7o2II83YqG8tL6gJZeZWu0aqXb3a8E2QUmJ2fCwxV44tPUGsa7G45-e3gJcEcGiQktD27atg9ifeySbRaE' },
  { id: 3, name: 'Грузинская', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8Fd_SidJHc3v4xZCYKZCQVhBaIT5eWJ7Zs0lKBmwx-o1uGwpOXm0i4QZK9BXh03jHr6r8lf-4pRDTZiSNyFKxVHSyckS7IkmD1rTNh0u_pOjFo-PaIEdCjtm47mt7CzvTG4_uXrs3bHmw91OogWfHpwYxkicA87ptVsqgQJQyeIbXVZ7TA-Y1Dym9Mi5Wkk1Iw5K1VAeeX7TDs2RIMFk4T9TIbnj-Pm4jBWh87d73rgjrZf2PSmi8rk_Gy9PrLGQWYWGuz63rGVU' },
  { id: 4, name: 'Мексиканская', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWjPU9gN8CQ8oQvI3zIGTdyBDQ3ECYfTpDI6ofuEq3RafSilqhddDfNQBJkjyHLmH-Apqs3w-lcT2XI9MTsD4nGV9KOcCmlmKg9r3VT8ACIeAXnxaIVqpW-fd7pM398hpOwQvjXd_-5OcHzrO8Yi320KmG70xo1wGYWYgKiweOB5cgPcwQ9tyoS1aYtzP8d7IeTsWxdG7WQ45GYeIsf3vyAFpPNYgCc2lF6tm0Iip5ZexCMUEHTxdo8WfEKk1j71RDrBIxDBHxctQ' },
  { id: 5, name: 'Индийская', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM1gqjjjSk1xWhlg1OR88xPW3j9d_Cbj2Grzt8mhqTWauqmRNKcjAA4IYAXwI09VJND8Gaf-eHy8otKXyXDkRNtIShh51BmoD2CjN44IjAFTSuEUYZa6z7YT3SdtYx0aYELMOWd7lCYtsB3of7qjawcOkrow8yKncPLNM4bYheDcPBFESeF4c_YaXCEGJ_1sRuNm8N0DOXzza9R-hG5ZYsrKDSEyai4kim6tK2fMLI12JBxBBv0chdhoLjGmg_OpBgdBc5Kdh1cjc' },
  { id: 6, name: 'Американская', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0Wd0D6LNRkAf3TCti0ugJnmLBLA-MjFDnbyQ9zdkv4aIZ-CGN_uukoAAUKaX23GExM3QswNnlMRcgGNLapn9H55ta6cdZpdVTC5LzM1wRFd2Ya0-NQk0bkqr9Gg2eQbmYcJzjYUyVeg9X0ErNb-wE6rcSuX4cVH9Z4hvEk_3VdEBFnJdYfEUr9p0nTuGD9sFM7w3KCNycZQFJXV0iF8BR9jbKep3MY2swaB7yXW_DJSfXTSP7No4KXIkq9QaT2_P6mnDP2OOqjFI' },
];

export default function CategoryCarousel() {
  return (
    <section className="flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <h2 className="font-h2 text-h2 text-on-surface">Выбор по кухне</h2>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {categories.map((cat) => (
          <div key={cat.id} className="snap-start shrink-0 flex flex-col items-center gap-3 cursor-pointer group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary-container transition-all">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <span className="font-label-md text-label-md text-on-surface">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}