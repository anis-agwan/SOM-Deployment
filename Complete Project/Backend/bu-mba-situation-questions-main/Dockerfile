FROM openjdk:18

WORKDIR /app

COPY ./target/bu-mba-situations.jar /app
EXPOSE 8443

ENTRYPOINT ["java", "-jar", "bu-mba-situations.jar"]
