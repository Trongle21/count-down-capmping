import React from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import img1 from '../assets/photos/1.jpg';
import img2 from '../assets/photos/2.jpg';
import img3 from '../assets/photos/3.jpg';
import img4 from '../assets/photos/4.jpg';
import img5 from '../assets/photos/5.jpg';
import img6 from '../assets/photos/6.jpg';
import img7 from '../assets/photos/7.jpg';
import img8 from '../assets/photos/8.jpg';
import img9 from '../assets/photos/9.jpg';
import img10 from '../assets/photos/10.jpg';

type Heart = {

    id: number

    title: string

    image: string

}



type HeartPictureProps = {

    isOpen: boolean

    selectedHeartId?: number | null

    onSelectHeart: (id: number) => void

    onClose: () => void

}


const HEARTS: Heart[] = [

    { id: 1, title: 'Buổi đi chơi bán chính thức đầu tiên của tụi mình, chuẩn bị kỹ càng để tối tớ tỏ tình, éo ngờ ngồi cạnh mơ run quá phun mẹ nó ra luôn. Pha đấy mà từ chối có khi buồn thiu, xem phim xong về luôn mất :))', image: img1 },

    { id: 2, title: 'T thích đi xem phim lắm, nhưng đi 1 mình thì gần như không bao giờ đi. Trc chỉ ước đi với bạn là được rồi, không ngờ có viễn cảnh đi cùng người yêu đi xem phim đâu. Thích được cầm tay mơ lúc xem phim, thích được ngồi trò chuyện với cậu xung quanh bộ phim (phim giờ là thứ yếu, chủ yếu lắm tay mơ hehehe)', image: img2 },

    { id: 3, title: 'Đây là buổi ăn đầu tiên ở công viên Phùng Khoang nếu mơ không nhớ (ăn bim bim ấy), đồ ăn ngon + phong cảnh siêu thích luôn. Sẽ còn cùng Mơ ăn kiểu này nhiều nhiều. Ông anh zai bảo ngày nào cũng câu cá mà mới gặp có lần', image: img3 },

    { id: 4, title: 'Một ngày năng suất của ny tui. Sáng xem phim, trưa ăn ốc, chiều sở thú, tối cà phê hồ tây, đêm ăn nướng với Linh, đêm muộn lại cà phê tiếp. Thương mơ, iu mơ', image: img4 },

    { id: 5, title: 'Món ăn của thời đại, bân xiển. Ngon, ăn bên cạnh mơ còn ngon hơn nữa', image: img5 },

    { id: 6, title: 'Lần đầu tiên nắm tay con gái, aahahahah. Tay gì đâu mà mềm, cầm thích vãi ra. Muốn cầm tay Mơ mãi thôi.', image: img6 },

    { id: 7, title: 'Lần đầu đi chơi riêng với nhau, ăn với nhau, ngồi cạnh riêng với nhau. Từ đó trong tim tớ bừng nắng hạ, từ hôm đó tớ xác định phải tỏ tình với Mơ bằng được luôn.', image: img7 },

    { id: 8, title: 'Cute nên cho vô :)))', image: img8 },

    { id: 9, title: 'Cùng nhau tạo thật nhiều kỷ niệm nhé, Yêu mơ nhiều lắm', image: img9 },

    { id: 10, title: 'Khởi đầu của mọi thứ, cảm ơn cậu vì đã rải thính, cho tớ cơ hội được yêu cậu. Yêu em nhiều lắm', image: img10 },

]



const FALLING_HEARTS = Array.from({ length: 30 }, (_, index) => ({

    id: index + 1,

    left: `${Math.random() * 100}%`,

    size: `${0.8 + Math.random() * 1.2}rem`,

    duration: 4.5 + Math.random() * 3.5,

    delay: Math.random() * 6,

    opacity: 0.45 + Math.random() * 0.55,

}))



export default function HeartPicture({ isOpen, selectedHeartId, onSelectHeart, onClose }: HeartPictureProps) {

    const selectedHeart = HEARTS.find((heart) => heart.id === selectedHeartId) ?? HEARTS[0]



    return (

        <AnimatePresence>

            {isOpen ? (

                <motion.div

                    className="heart-picture__overlay"

                    role="dialog"

                    aria-modal="true"

                    aria-label="Heart picture gallery"

                    initial={{ opacity: 0 }}

                    animate={{ opacity: 1 }}

                    exit={{ opacity: 0 }}

                >

                    <div className="heart-rain heart-rain--dense" aria-hidden="true">

                        {FALLING_HEARTS.map((heart) => (

                            <motion.div

                                key={heart.id}

                                aria-hidden="true"

                                className="heart-rain__item heart-rain__item--floating"

                                style={{

                                    left: heart.left,

                                    fontSize: heart.size,

                                    opacity: heart.opacity,

                                }}

                                initial={{ y: -50, opacity: 0, scale: 0.4 }}

                                animate={{ y: '112vh', opacity: [0, heart.opacity, heart.opacity, 0], rotate: [0, 12, -12, 0] }}

                                transition={{ duration: heart.duration, delay: heart.delay, repeat: Infinity, ease: 'linear' }}

                            >

                                <span>♥</span>

                            </motion.div>

                        ))}

                    </div>



                    <motion.div

                        className="heart-picture"

                        initial={{ scale: 0.85, y: 24, opacity: 0 }}

                        animate={{ scale: 1, y: 0, opacity: 1 }}

                        exit={{ scale: 0.9, y: 16, opacity: 0 }}

                        transition={{ type: 'spring', stiffness: 170, damping: 18 }}

                    >

                        <button type="button" className="heart-picture__close" onClick={onClose} aria-label="Close picture view">

                            ×

                        </button>



                        <div className="heart-picture__gallery">

                            {HEARTS.map((heart) => (

                                <button

                                    key={heart.id}

                                    type="button"

                                    className={`heart-mini ${heart.id === selectedHeart.id ? 'is-active' : ''}`}

                                    onClick={() => onSelectHeart(heart.id)}

                                >

                                    <span className="heart-mini__icon">♥</span>

                                </button>

                            ))}

                        </div>



                        <div className="heart-picture__viewer">

                            <div className="heart-picture__frame">

                                <img src={selectedHeart.image} alt={selectedHeart.title} />

                            </div>

                            <p>{selectedHeart.title}</p>

                        </div>

                    </motion.div>

                </motion.div>

            ) : null}

        </AnimatePresence>

    )

}

