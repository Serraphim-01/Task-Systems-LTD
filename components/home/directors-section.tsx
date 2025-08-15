"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export function DirectorsSection() {
    const [directors, setDirectors] = useState<any[]>([]);

    useEffect(() => {
        const fetchDirectors = async () => {
            const { data, error } = await supabase.from('directors').select('*').order('created_at', { ascending: true });
            if (data) {
                setDirectors(data);
            }
        };
        fetchDirectors();
    }, []);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Board of Directors
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet our experienced leadership team driving innovation and
            excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[100%] md:max-w-[70%] mx-auto">
          {directors.map((director, index) => (
            <Link key={director.id} href={`/directors/${director.id}`} className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer w-full max-w-[220px]"
              >
                <div className="relative">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${director.image_path}`}
                      alt={director.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-lg ring-4 ring-[#ffbb00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.02 }}
                  />

                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-[#ffbb00] transition-colors duration-300">
                      {director.name}
                    </h3>
                    <p className="text-muted-foreground text-md mt-1">
                      {director.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
