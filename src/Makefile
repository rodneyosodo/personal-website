build:
	cd anatole/exampleSite/ && rm -rf public public.zip && hugo --gc --minify --themesDir ../.. && mkdir public/CV && cp ../../CV/* public/CV/ && zip -rqT9 public.zip public/
run:
	cd anatole/exampleSite/ && hugo serve --gc --minify --themesDir ../..