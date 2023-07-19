process system_image {

    output:
    path '*.ji'

    """
    julia --output-ji myimage.ji
    """
}

process cli {
    container 'julia'

    input:
    path csv_file

    output:
    stdout

    """
    hello.jl $csv_file
    """
}

process shebang {
    container 'julia'
    beforeScript 'julia --project=. -e \'using Pkg; Pkg.add(["HTTP", "DataFrames"]);\''

    input:
    path csv_file


    """
    #!/usr/bin/env -S julia --color=yes --startup-file=no --project=.

    using Pkg; Pkg.add(["HTTP", "DataFrames"]);\

    using DataFrames
    """
}

workflow {
    cli(file('./test.csv'))
    shebang(file('./test.csv'))
}
