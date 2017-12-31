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

(defn make-household-items
  []
  (let [items (-> (slurp "household.de.raw") (s/split #"\n"))
        items (reduce (fn [s i]
                        (str s ",\n'" i "'"))
                     (str "'" (first items) "'")
                     (rest items))]
    (->> (str "[\n" items "\n]\n")
         (spit "household.de"))))

(defn common-job-prefices
  ([] (common-job-prefices "jobs.de" "jobs.short.de"))
  ([in out]
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
           (str "[" (s/join ",\n" (map #(str \' % \') jobs)) "]")))))







