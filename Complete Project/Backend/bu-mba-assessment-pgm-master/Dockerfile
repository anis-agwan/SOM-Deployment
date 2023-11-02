FROM openjdk:18

WORKDIR /app

COPY ./target/bu-mba-pb.jar /app
EXPOSE 8441

ENTRYPOINT ["java", "-jar", "bu-mba-pb.jar"]
