#!/usr/bin/env -S julia --color=yes --startup-file=no

println(PROGRAM_FILE);
abspath(PROGRAM_FILE) == @__FILE__

@show ARGS

for x in ARGS
    println(x)
end
