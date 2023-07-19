import Pkg; Pkg.add(["CSV", "DataFrames"])

using CSV, DataFrames

df = DataFrame(CSV.File(snakemake.input[1], footerskip=50))
names(df)
CSV.write(snakemake.output[1], df)
