(ns quiz
  (:require [clojure.string :as s]))

(defn read-jobs
  "Read and convert to data structure."
  [jobs-file]
  (reduce
    (fn [acc v]
      (cond
        (= "[[" v) (conj acc [])
        (= "],[" v) (conj acc [])
        (= "]]" v) acc
        (= "," v) acc
        true (conj (pop acc) (conj (last acc) v))))
    []
    (-> (slurp jobs-file)
        (s/replace #"\n" "")
        (s/split #"'"))))

(defn main [in out]
  (let [jobs (map (fn [ss]
                    (if (= 1 (count ss))
                      (first ss)
                      (let [p (loop [c 0 ss ss]
                                (if (and (apply = (map first ss))
                                         (seq (first ss)))
                                  (recur (inc c) (map rest ss))
                                  c))]
                        (if (> p 0)
                          (str (subs (first ss) 0 p)
                               "|"
                               (s/join "|" (map #(subs % p (count %)) ss)))
                          (first ss)))))
                  (read-jobs in))]
    (spit out
          (str "[" (s/join ",\n" (map #(str \" % \") jobs)) "]"))))





