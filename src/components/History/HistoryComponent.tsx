"use client";
import React, { useEffect, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import { FaDotCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HistoryComponent() {

  const [timelineMode, setTimelineMode] = useState<'left' | 'alternate' | 'right'>('left');

  // Function to check screen size and set the appropriate mode
  const handleResize = () => {
    if (window.innerWidth >= 1024) { // 1024px is the 'lg' breakpoint in Tailwind
      setTimelineMode('alternate');
    } else {
      setTimelineMode('left');
    }
  };

  // Set initial mode and add resize listener
  useEffect(() => {
    handleResize(); // Set initial mode based on screen size
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  const raw = [
    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">1986</h1>

          <p className="">Establishment of TYC BROTHER INDUSTRIAL CO., LTD.</p>

          <p>
            The original TYC logo was comprised of a circular frame logo that
            symbolizes harmony within the industry as well as within the
            company’s corporate culture and attitude towards people.Bringing
            Happiness, Convenience, Hope & Encouragement to others.
          </p>

          <div className="flex md:justify-end"> 
            <img
              src="https://www.tyc.com.tw/assets/uploads/about/history/year1434523994.png"
              alt=""
            />
          </div>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">1991</h1>

          <p className="text-left">
            Established first U.S. Sales & Distribution Center GENERA
            CORPORATION (formerly TYC Industrial Co., USA) located in
            California.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">1995</h1>

          <p>
            Established 1st manufacturing plant in China called CHANGZHOU TAMAU
            AUTO LAMP.
          </p>

          <p>
            Established GENERA CORPORATION’s second U.S. Sales & Distribution
            Center (formerly Land Force Corp.) in New Jersey.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">1997</h1>

          <p>Initial Public Offering listed in Taiwan Securities Exchange.</p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">1998</h1>
          <p>
            In 1998 the new sun rays design shows a clear and neat conveying
            TYC‘s goal of Lighting up the world!
          </p>
          <div className="flex md:justify-end"> 

          <img
            src="https://www.tyc.com.tw/assets/uploads/about/history/year1432807349.png"
            alt=""
          />
</div>
          <p>
            Established third U.S. Sales & Distribution Center of GENERA
            CORPORATION in Texas.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">1999</h1>
          <p>
            Acquired TAIWAN STANLEY INDUSTRIAL CO., LTD., now known as JUOKU
            TECHNOLOGY CO. LTD.
          </p>

          <p>
            Established fourth U.S. Sales& Distribution Center of GENERA
            CORPORATION in Illinois.{" "}
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">2001</h1>
          <p>
            Established T.I.T. INTERNATIONAL CO., automotive lighting
            manufacturing plant in Rayong, Thailand.
          </p>

          <p>
            Established fifth U.S. Sales & Distribution Center of GENERA
            CORPORATION in Georgia.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">2002</h1>
          <p>
            Entered into JV cooperation with China HARBIN HAFEI INDUSTRY CO.,
            LTD. and formed HARBIN HAXING MOTOR COMPONENTS CO., LTD. in China.{" "}
          </p>

          <p>
            Established CHANGZHOU TAMOU PRECISION INDUSTRIAL CO. LTD., for
            plastic tooling design, development and manufacturing in China.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">2003</h1>
          <p>
            Built and moved manufacturing production plant facilities to Tainan
            Tech Park.
          </p>

          <p>
            Established Europe Central Sales & Distribution Warehouse called TYC
            EUROPE B.V. in Almere, the Netherlands.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">2004</h1>
          <p>
            Entered into a JV cooperation with China FIRST AUTO WORKS and formed
            CHANGCHUN E-CHI SHI HUAN.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">2005</h1>
          <p>
            Visteon Corporation USA purchased shares in CHANGZHOU TAMAU AUTO
            LAMPS which is then renamed VISTEON TYC AUTO LAMPS CO., LTD.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">2009</h1>
          <p>
            Increased share holding of CHANG CHUN E CHI SHI HUAN to 100% and
            renamed it CHANG CHUN SPARX AUTO LAMPS CO., LTD.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5 "
        >
          <h1 className="text-3xl font-bold text-blue-500">2010</h1>
          <p>
            Established KUN SHAN TYC HIGH PERFORMANCE LIGHTING TECH CO., LTD in
            China.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5 mb-20"
        >
          <h1 className="text-3xl font-bold text-blue-500">2011</h1>
          <p>
            The evolution of the TYC logo into a single form with corporate Blue
            color, conveys the value of pursuing “Light, Precision and Safety”.
          </p>

          <img
            src="https://www.tyc.com.tw/assets/uploads/about/history/year1432808026.png"
            alt=""
            // className="float-right ml-5 w-1/3 " // This will align the image to the right
            className="ml-5 w-1/3"
          />
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">2012</h1>
          <p>Started Phase 2 Tainan Tech Park Warehouse operation. </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">2013</h1>
          <p>
            Changed the name of VISTEON TYC AUTO LAMPS CO. to VARROC TYC AUTO
            LAMPS CO. after Varroc Group India purchased Visteon’s shareholding.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">2014</h1>
          <p>
            Opening of second manufacturing plant of VARROC TYC AUTO LAMPS CO.
            in Chonqing, China.
          </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">2015</h1>
          <p>Started Phase 3 Tainan Tech Park Assembly Plant Operation. </p>
        </motion.div>
      ),
    },

    {
      dot: <FaDotCircle className="text-pink-500" />,
      children: (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-blue-500">2020</h1>
          <p>Established TYC VIETNAM INDUSTRIAL CO.,LTD. in Vietnam.</p>
        </motion.div>
      ),
    },
  ];
  return (
    <>
      {/* <div className="bg-blue-500 h-2 w-full"></div> */}
      <div className="container mx-auto my-10 lg:px-80">
        <div className="space-y-5">
          <h1 className="text-5xl lg:text-4xl xl:text-6xl font-bold text-pink-500  text-center">
            TYC History
          </h1>

          <h1 className="text-3xl font-bold text-center text-blue-500 mb-10">
            PROGRESS THROUGH TIME
          </h1>
        </div>

        <div className="p-2">
        <Timeline
          mode={timelineMode}
          items={raw.reverse().map((xx, index) => {
            return {
              children: xx.children,
              dot: xx.dot,
              position: index % 2 == 0 ? "right" : "left",
            };
          })}
        />

</div>
      </div>
    </>
  );
}
